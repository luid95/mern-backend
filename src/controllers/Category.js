'use strict'
const Category = require('../models/Category');

var ctrlc = {};

//create category
ctrlc.create = (req, res) => {

    var params = req.body;
    
    const category = new Category();

    // Asignar valores a la category
    category.name = params.name;

    // Y guardar category
    category.save((err, categoryStored) => {

        if(err){
            return res.status(404).send({
                message: "Algo ha salido mal con el servidor"
            });
        }

        if(!categoryStored){
            return res.status(500).send({
                message: "The category doesn't save"
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: 'success',
            category: categoryStored
        });
    });
};

//list category
ctrlc.list = (req, res) => {
    Category.find().exec((err, categories) => {

        if(err){

            return res.status(500).send({
                status: "error",
                message: "Error en la peticion"
            });
        }

        if(!categories){

            return res.status(404).send({
                status: "error",
                message: "No existe la category"
            });
        }

        return res.status(200).send({
            status: "success",
            categories: categories
        });

    });
};

//remove categoryById
ctrlc.delete = (req, res) => {

    var categoyId = req.params.id;

    // Find and delete por categoryID 
    Category.findOneAndDelete({_id: categoyId}, (err, categoryRemoved) => {

        if(err){

            return res.status(500).send({
                status: "error",
                message: "Error en la peticion"
            });
        }

        if(!categoryRemoved){

            return res.status(404).send({
                status: "error",
                message: "No se ha borrado la categoria"
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: 'success',
            category: categoryRemoved
        });
    });

};

//listar por ID categoryById
ctrlc.getCategory = (req, res) => {

    var categoryId = req.params.id;

    // Find por id del topic
    Category.findById(categoryId)
         .exec((err, category) => {

            if(err){

                return res.status(500).send({
                    status: "error",
                    message: "Error en la peticion"
                });
            }

            if(!category){

                return res.status(404).send({
                    status: "error",
                    message: "No existe la categoria"
                });
            }

            return res.status(200).send({
                status: "success",
                category: category
            });

         });

};

module.exports = ctrlc;