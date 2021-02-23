'use strict'

const mongoose = require('mongoose'); 
const app = require('./server');

// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;

//connecting to db
const uri = process.env.DATABASE;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log('La conexion a la base de datos de mongo se ha realizado correctamente!!');

    // Crear el servidor
    app.listen(app.get('port'), ()=>{
        console.log("Server on port ", app.get('port'));
        
    })
})
.catch(err => console.log(err));