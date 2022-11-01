const { Router } = require('express');
const { loader } = require('../controller');
const {Country, Activity} = require('../db')

const router = Router();



router.post('/', async (req,res) => {
    const {nameCountry, name, difficulty, duration, season} = req.body;
    try{        
        const newActivity = await Activity.create({ name, difficulty, duration, season});
        const countryDb = await Country.findAll({
            where:{
                name: nameCountry
            }
        })
        newActivity.addCountry(countryDb)
        return res.send({message: "La actividad " + { name } + " Se creo exitosamente"});
    }catch(error){
         return res.send("La actividad no se pudo crear por " + error);
    }
});
module.exports = router;