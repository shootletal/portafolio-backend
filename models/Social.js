const { Schema, model, Model } = require('mongoose');

const SocalSchema = Schema ({
    nombre_red: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model( 'Social', SocalSchema );