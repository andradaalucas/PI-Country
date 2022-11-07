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

// router.get('/:activityId', async (req,res) => {
//     try{
//          const {activityId} = req.params;
//          const activity = await Activity.findByPk(activityId, {
//               include: {
//                    model: Country
//               }
//          });
//          res.send(activity ? activity : []);
//     }catch(e){
//          res.send(e);
//     }
// });

router.get('/', async (req, res) =>{
    try{
        const allActivities = await Activity.findAll({include: {
            model: Country
        }})
        
        res.send(allActivities)
    }
    catch(e){
        res.send(`Este es el error de get activities por: (${e})`);
    }
})


module.exports = router;

