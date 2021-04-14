const { Schema, model } = require('mongoose');

const portafolioSchema = Schema({
    nombre: {
        type:String,
        require:true,
        trim: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    link: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
   
});

module.exports = model( 'Portafolio', portafolioSchema );