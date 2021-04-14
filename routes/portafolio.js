/*
    Rutas para trabajos

    host + /api/portafolio
*/


const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validator-jwt');

//Importacion controller Jobs
const portController = require('../controllers/portafolioController')

//Validar tokens
router.use( validarJWT );

//Obtener listado de trabajos
router.get( '/', portController.listJobs );


//Obtener listado de trabajos
router.post( '/', portController.createJob );

//Obtener listado de trabajos
router.put('/:id', portController.updateJob );

//Obtener listado de trabajos
router.delete('/:id', portController.deleteJob );

module.exports = router;
