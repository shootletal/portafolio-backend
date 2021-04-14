const { Schema, model } = require('mongoose');

const imageSchema = Schema({
    url_image: {
        type:String,
        require:true
    },
    job:{
        type: Schema.Types.ObjectId,
        ref: 'Portafolio',
        require: true
    }
   
});

module.exports = model( 'Image', imageSchema );