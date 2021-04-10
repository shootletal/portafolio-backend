const express = require('express');

require('dotenv').config();

//Crea el servidor de express
const app = express();

//DIRECTORIO PUBLICO
app.use(express.static('public'));

//RUTAS
app.get('/', (req, res) =>{
    res.json({
        ok:true
    })
});


//Escucha peticiones
app.listen( process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${ process.env.PORT }`);
});