/*
    Rutas de redes sociales / social
    host + /api/social/
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validator-jwt');
const router = Router();

//Controladores
const socialController = require('../controllers/socialController')

//Pasar todoas las rutas siguientes por middleware
router.use( validarJWT );

//Listado de redes sociales del usuario
router.get( '/', socialController.indexSocial );

//Agregar nuevas redes sociales
router.post( '/', socialController.createSocial );

//Actualizar redes sociales
router.put( '/:id', socialController.updateSocial );

//Borrar red social
router.delete( '/:id', socialController.deleteSocial );


module.exports = router;