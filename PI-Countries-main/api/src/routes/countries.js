const { Router } = require('express');
const {Country, Activity} = require('../db')
const { Op } = require('sequelize');
const router = Router();


//Ruta get por name de country o traer todos los paises
router.get('/', async (req,res) => {
    const name = req.query.name
    const country = await Country.findAll({include: Activity})
    const countryForName = await Country.findAll({
        where: {
            name: {
            [Op.iLike]: `%${name}%`
          },
        },
         include: Activity
      });
    try{
        if(name){
            countryForName.length?
            res.status(200).send(countryForName):
            res.status(404).send(`No se encontro el pais ${name}`)
        }
        else{
            res.send(country)
        }
    } catch(error){
        res.status(400).send(error);
    }
});
//Ruta get de country por id
router.get('/:id', async (req,res) => {
    const id = req.params.id.toUpperCase();
    try{
         const countryForId = await Country.findByPk(id, {
            include: {
                model: Activity
            }
        });
         return res.send(countryForId)
    }catch(error){
         res.status(400).send(error);
    }
});


module.exports = router;