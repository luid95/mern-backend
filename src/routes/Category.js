'use strict'
const express = require('express');
const categoryController = require('../controllers/Category');

//para crear una ruta con express
var router = express.Router();

router.post('/category/create', categoryController.create);
router.get('/category/categories', categoryController.list);
router.delete('/category/:id', categoryController.delete);
router.get('/category/:id', categoryController.getCategory);

module.exports = router;