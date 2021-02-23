'use strict'
const express = require('express');
const categoryController = require('../controllers/Category');

//para crear una ruta con express
var router = express.Router();

router.post('/create', categoryController.create);
router.get('/categories', categoryController.list);

module.exports = router;
// minuto 50