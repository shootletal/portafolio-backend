const express = require('express');
const { dbConnection } = require('./database/config');

require('dotenv').config();

//Crea el servidor de express
const app = express();

//DIRECTORIO PUBLICO
app.use(express.static('public'));

//Parceo de data request a json
app.use( express.json() );

//Conexion a la base de datos
dbConnection();

//RUTAS
/* rutas para autenticacion de usuario */
app.use('/api/auth', require('./routes/auth') );


//Escucha peticiones
app.listen( process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${ process.env.PORT }`);
});