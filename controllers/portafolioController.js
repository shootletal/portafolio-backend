
const { response } = require('express');
const { smsResp } = require('../helpers/smsResp');
const Portafolio = require('../models/Portafolio');


//Agregar trabajos
const listJobs = async(req, res=response) => {

    const { uid } = req;

    try {
        const jobs = await Portafolio.find({ user: uid })
                                     .populate('user', 'nombre');

        res.json( smsResp(true, 200, 'listado', jobs) );

    } catch (error) {
        console.log(error);
        res.status(500).json( smsResp(false, 500, 'Error al buscar') );
    }
}

//Crear trabajos
const createJob = async(req, res=response) => {
    const { uid } = req;

    try {

        const job = new Portafolio( req.body );

        job.user = uid;

        await job.save();
        
        res.status(201).json( smsResp(true, 201 ,'Nuevo trabajo agregado', job.populate('user', 'name') ) );
        

    } catch (error) {
        console.log(error);
        res.status(500).json( smsResp(false, 500, 'Error al guardar' ) ); 
    }
}

//Agregar trabajos
const updateJob = async(req, res=response) => {

    const id = req.params.id;
    const { uid } = req;

    try {

        
        let job = await Portafolio.findById( id );

        if ( !job ) {
            res.status(404).json( smsResp(false, 404, 'No se encuentra registrada ese trabajo en portafolio '));
        }

        if ( job.user.toString() !== uid ) {
            res.status(401).json( smsResp(false, 401, 'No tiene los privilegios para actualizar este registro'));
        }

        const updatePortafolio = {
            ...req.body,
            user: uid
        } 

        job = await Portafolio.findByIdAndUpdate(id, updatePortafolio, { new: true})
                             .populate('user', 'nombre');

        res.status(200).json( smsResp(true, 200, 'Trabajo de portafolio actualizado correctamente', job));
        

    } catch (error) {
        console.log(error);
        res.status(500).json( smsResp(false, 500, 'Error al guardar' ) ); 
    }
}

//Eliminar trabajos
const deleteJob = async(req, res=response) => {

    const id = req.params.id;
    const { uid } = req;

    try {

        
        let job = await Portafolio.findById( id );

        if ( !job ) {
            res.status(404).json( smsResp(false, 404, 'No se encuentra registrada ese trabajo en portafolio '));
        }

        if ( job.user.toString() !== uid ) {
            res.status(401).json( smsResp(false, 401, 'No tiene los privilegios para actualizar este registro'));
        }

        job = await Portafolio.findByIdAndDelete( id );
        res.status(200).json( smsResp(true, 200, 'Trabajo de portafolio eliminado correctamente'));
        

    } catch (error) {
        console.log(error);
        res.status(500).json( smsResp(false, 500, 'Error al guardar' ) ); 
    }
}


module.exports = {
    listJobs,
    createJob,
    updateJob,
    deleteJob
}