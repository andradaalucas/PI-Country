const { Router } = require('express');
const {Country, Activity} = require('../db')

const router = Router();


router.post('/activity', async (req,res) => {
    // Hago destructuring de la data mandada por body
    const {idCountries,
         name,
         difficulty,
         duration,
         season} = req.body;
    try{
        if(!name|| !difficulty || !duration || !season ){
            res.send("Completa todos los campos obligatorios")
        } else{
            const newActivity = await Activity.create({
                  name, difficulty, duration, season
             });
             // idCountries es un array de ids de los Countries. Por cada id, se le agrega la actividad posteada
             idCountries.forEach(id => {
                  newActivity.addCountries(id);
             });          
             res.json(newActivity);
        }
    }catch(e){
         res.send(e);
    }
});



module.exports = router;