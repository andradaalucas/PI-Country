const { Router } = require('express');
const {Country, Activity} = require('../db')
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



const getDbInfo = async () => {
    const countryconsole = await Country.findAll({include : Activity})
    return countryconsole;
}
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries", async (req, res) => {
    const name = req.query.name
    let totalcountries = await getAllCountries();
    if(name){
        let countriesname = totalcountries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        countriesname.name ?
        res.status(200).send(countriesname):
        res.status(404).send("No existe este pais")
    } else{
        res.status(200).send(totalcountries)
    }
});


router.get('/countries'), async (req, res) => {
    try{
        const all = await getDbInfo()
        res.status(200).send(all)
    }
    catch(error){
        res.status(404).send("te equivocaste pa")
    }
}

router.get('/countries/:id', async (req,res) => {
    try{
        if({id}){
            const {id} = req.params;
         const country = await Country.findByPk(id, {
              include: {
                   model: Activity
              }
         });
         res.status(200).json(country ? "No se encontro" : ["asda"]);
        } else{
         res.send("No se encontro")
        }     
    }catch(e){
         res.status(400).send(e);
    }
});


router.post('/activity', async (req,res) => {
    // Hago destructuring de la data mandada por body
    const {idCountries, name, difficulty, duration, season} = req.body;
    try{
         const newActivity = await Activity.create({
              name, difficulty, duration, season
         });
         // idCountries es un array de ids de los Countries. Por cada id, se le agrega la actividad posteada
         idCountries.forEach(id => {
              newActivity.addCountries(id);
         });          
         res.json(newActivity);
    }catch(e){
         res.send(e);
    }
});
module.exports = router;