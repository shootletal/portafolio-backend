const { response } = require('express');
const { smsResp } = require('../helpers/smsResp');
const Social = require('../models/Social');


const indexSocial = async( req, res=response ) =>{

    const redes = await Social.find()
                              .populate('user' , 'nombre');

    res.status(200).json( smsResp(true, 200, 'Lista de redes sociales', redes ));
}

const createSocial = async( req, res=response ) =>{

    const { uid } = req;

    try {

        const social = new Social( req.body );
        social.user = uid;

        await social.save();

        res.status(201).json( smsResp(true, 201, 'Red social agregada correctamente', social));
        
    } catch (error) {
        console.log(error);
        res.status(400).json( smsResp(false, 404, 'Error al guardar'));
    }

    
}

const updateSocial = async( req, res=response ) =>{

    const id = req.params.id;
    const { uid } = req;

    try {
        
        let social = await Social.findById( id );

        if ( !social ) {
            res.status(404).json( smsResp(false, 404, 'No se encuentra registrada esa red social'));
        }

        if ( social.user.toString() !== uid ) {
            res.status(401).json( smsResp(false, 401, 'No tiene los privilegios para actualizar este registro'));
        }

        const updateSocial = {
            ...req.body,
            user: uid
        } 

        social = await Social.findByIdAndUpdate(id, updateSocial, { new: true})
                             .populate('user', 'nombre');

        res.status(200).json( smsResp(true, 200, 'Red social actualizada correctamente', social));
        
    } catch (error) {
        console.log(error);
        res.status(400).json( smsResp(false, 404, 'Error al guardar'));
    }
    
}

const deleteSocial = async( req, res=response ) =>{
    const id = req.params.id;
    const { uid } = req;

    try {
        
        const social = await Social.findById( id );

        if ( !social ) {
            res.status(404).json( smsResp(false, 404, 'No se encuentra registrada esa red social'));
        }

        if ( social.user.toString() !== uid ) {
            res.status(401).json( smsResp(false, 401, 'No tiene los privilegios para actualizar este registro'));
        }

        await Social.findByIdAndDelete(id);

        res.status(201).json( smsResp(true, 201, 'Red social eliminada correctamente'));
        
    } catch (error) {
        console.log(error);
        res.status(500).json( smsResp(false, 500, 'Error al guardar'));
    }
}

module.exports = {
    indexSocial,
    createSocial,
    updateSocial,
    deleteSocial
}