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
        await newActivity.addCountry(countryDb)
        return res.send(`message: la actividad   ${ name }   se creo exitosamente`);
    }catch(error){
         return res.send("La actividad no se pudo crear por " + error);
    }
});


module.exports = router;



/*let arr = [];
		for (let i = 0; i < countryId.length; i++) {
			arr[i] = await newActivity.addCountry(countryId[i]);
		}
		if (newActivity && arr[0]) {
			res.json({ message: 'Se vinculo correctamente', data: newActivity });
		} else {
			res.json({
				message: 'ERROR no se pudieron insertar los datos correctamente'
			});
		} */