const { response } = require('express');
const { validationResult } = require('express-validator');

const { smsResp } = require('../helpers/smsResp');


const validatorFields = (req, res = response, next) => {

    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json( smsResp(false, 400, "Campos ingresados incorrectos", false , errors.mapped()) );
    }

    next();
}

module.exports = {
    validatorFields
}