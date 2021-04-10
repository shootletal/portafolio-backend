const { response } = require('express');
const { validationResult } = require('express-validator');

const { smsResp } = require('../extras/smsResp');


const validatorFields = (req, res = response, next) => {

    const errores = validationResult(req);

    if ( !errores.isEmpty() ) {
        return res.status(400).json( smsResp(false, 400, "Campos ingresados incorrectos", false , errores.mapped()) );
    }

    next();
}

module.exports = {
    validatorFields
}