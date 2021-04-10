const express = require('express');
const response = express.response;

/* Crear usuario */

const createUser = ( req, res = response ) => {
 
    res.json({
        nuevo: "lol",
        user: req.body
    });
}


/* Login de usuario */
const login = (req, res = response) => {
    res.json({
        nuevo: "lol",
        user: req.body
    });
}

module.exports = {
    createUser,
    login
}