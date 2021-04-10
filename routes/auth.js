/*
    Rutas de usuario / auth
    host + /api/auth/

*/

const { Router } = require('express');
const router = Router();

const { validatorFields } = require('../middlewares/validator-fields')

const authController = require('../controllers/authController');
const { check } = require('express-validator');


// Agregar nuevo usuario
router.post('/register',
    [
        check('name','El nombre es requerido').notEmpty(),
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

module.exports = router;