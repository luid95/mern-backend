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
    category.save((err, data) => {

        if(err){
            return res.status(404).send({
                message: "Algo ha salido mal con el servidor"
            });
        }

        if(!data){
            return res.status(500).send({
                message: "The category doesn't save"
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: 'success',
            category: data
        });
    });
};

//list category
ctrlc.list = (req, res) => {
    Category.find().exec((err, data) => {

        if(err){

            return res.status(500).send({
                status: "error",
                message: "Error en la peticion"
            });
        }

        if(!data){

            return res.status(404).send({
                status: "error",
                message: "No existe la category"
            });
        }

        return res.status(200).send({
            status: "success",
            category: data
        });

    });
}

module.exports = ctrlc;