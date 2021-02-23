'use strict'

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();

//Carga de rutas
var category_routes = require('./routes/Category');

//configuracion de puerto
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario
app.use(cors());
//debe ejecutarse antes de las rutas

//configuracion de cabeceras http
app.use( (req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-KEY, Access-Control-Allow-Request-Method');
  // allowed XHR methods
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');  
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');

  next();
});

//rutas base
app.use('/api', category_routes);

module.exports = app;