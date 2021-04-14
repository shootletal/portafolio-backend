const express = require('express');
const bcrypt = require('bcryptjs');

const { smsResp } = require('../helpers/smsResp');

const response = express.response;

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

/* Crear usuario */

const createUser = async( req, res = response ) => {

    const { email,user, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ $or: [{ email: email }, { user: user }] });
    
        if ( usuario ){
            
            return res.status(400).json( smsResp(false, 400, 'El correo o usuario ya esta en uso') );
        }
        
        usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
        //Guardar info en mongo
        await usuario.save();

        //Generar token 
        const token = await generarJWT(usuario.id, usuario.nombre);

        res.status(201).json( smsResp(true, 201, 'Usuario registrado con exito', {uid: usuario.id, nombre: usuario.nombre, token:token} ) )


    } catch (error) {
        console.log(error);

        res.status(500).json( smsResp(false, 500, 'Por favor hable con el administrador') )
        
    }
}


/* Login de usuario */
const login = async(req, res = response) => {
    
    const { user, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ user });

        if( !usuario ){
            res.status(400).json(
                smsResp(false, 400, 'El usuario o contraseña incorrecto')
            );
        }

        const pass = bcrypt.compareSync( password, usuario.password );  
        
        if ( !pass ) {
            res.status(400).json( smsResp(false, 400, 'Contraseña incorrecta') );    
        }
        
        const token = await generarJWT(usuario.id, usuario.nombre);

        res.json( smsResp( true, 200, 'Acceso autorizado', { id: usuario.id, nombre:usuario, token: token }  ) );
        
    } catch (error) {
        console.log(error);
        res.status(500).json( smsResp(false, 500, 'Por favor hable con el administrador') )
    }

}

//Renovacion de token
const renewJWT = async(req, res=response ) => {

    const { uid, nombre } = req;

    //Generar nuevo token
    const token = await generarJWT( uid, nombre );

    res.status(201).json( smsResp(true, 200, 'Nuevo token generado', token ) );
}

module.exports = {
    createUser,
    login,
    renewJWT
}