/* Formato de respuesta de solicitudes */

const smsResp = ( status, code, mensaje , data=false , errors = [] ) => {

    const resp = {
        status: status,
        code: code,
        mensaje: mensaje,
        data: data,
        errors: errors
    }

    return resp;

}

module.exports = {
    smsResp
};