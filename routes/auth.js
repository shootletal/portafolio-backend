/*
    Rutas de usuario / auth
    host + /api/auth/

*/

const { Router } = require('express');
const router = Router();

//Middlewares
const { validatorFields } = require('../middlewares/validator-fields');
const { validarJWT } = require('../middlewares/validator-jwt');

const authController = require('../controllers/authController');
const { check } = require('express-validator');


// Agregar nuevo usuario
router.post('/register',
    [
        check('nombre','El nombre es requerido').notEmpty(),
        check('email','El email es requerido').notEmpty(),
        check('user','El usuario es requerido').notEmpty(),
        check('password','La clave es requerida').notEmpty(),

        validatorFields
    ], 
    authController.createUser 
);

//Login de usuario
router.post('/login',
    [
        check('user', 'El usuario es obligatorio').notEmpty(),
        validatorFields
    ],
    authController.login
);


//Renovar token
router.get('/renew', validarJWT ,authController.renewJWT);

module.exports = router;