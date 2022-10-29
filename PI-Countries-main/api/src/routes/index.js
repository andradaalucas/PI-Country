const { Router } = require('express');
const {Country, Activity} = require('../db')
const { Op } = require('sequelize');
const countriesRoutes = require('./countries.js')
const activitiesRoutes = require('./activities.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countriesRoutes);
router.use('/activities', activitiesRoutes);

module.exports = router;