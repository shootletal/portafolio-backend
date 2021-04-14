const { response } = require('express');
const jwt = require('jsonwebtoken');
const { smsResp } = require('../helpers/smsResp');

const validarJWT = ( req, res = response, next ) => {

    
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json( smsResp(false, 401, 'Falta token de seguridad' ));
    }

    try {

        const { uid, nombre } = jwt.verify(
            token,
            process.env.SECRET_JWT
        );

        req.uid = uid;
        req.nombre = nombre;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json( smsResp(false, 401, 'Usuario no autorizado' ));
    }

    next();
}

module.exports = {
    validarJWT
}