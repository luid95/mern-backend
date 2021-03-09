'use strict'
const express = require('express');
const categoryController = require('../controllers/Category');

//para crear una ruta con express
var router = express.Router();
var md_auth = require('../middlewares/authenticated');

router.post('/category/create', md_auth.authenticated, categoryController.create);
router.get('/category/categories', categoryController.list);
router.delete('/category/:id', md_auth.authenticated, categoryController.delete);
router.get('/category/:id', categoryController.getCategory);

module.exports = router;