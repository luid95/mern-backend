'use strict'

var fs = require('fs');
var path = require('path');
const validator = require('express-validator');
const Videogame = require('../models/Videogame');
const { nextTick } = require('process');

var ctrlvg = {};

//create videogame
ctrlvg.create = (req, res, files) => {

    var params = req.body;

    const videogame = new Videogame();

    // Asignar valores del videogame
    videogame.name = params.name;
    videogame.description = params.description;
    videogame.price = params.price;
    videogame.category = params.category;
    videogame.quantity = params.quantity;
    videogame.photo = null;

    // Gardar el Topic
    videogame.save((err, vgameStored) => {

        if(err){
            return res.status(500).send({
                status: "error",
                message: "El videojuego no se ha guardado"
            });
        }

        if(!vgameStored){
            return res.status(500).send({
                status: "error",
                message: "El videojuego no se ha guardado"
            });
        }

        // Devolver una respuesta
        res.status(200).send({
            status: "success",
            game: vgameStored
        });

    });
           
    
};

//list videogame
ctrlvg.list = (req, res) => {
    Videogame.find()
    .select("-photo")
    .populate("category")
    .sort([['name', 'desc']])
    .exec((err, vgames) => {

        if(err){

            return res.status(500).send({
                status: "error",
                message: "Error en la peticion"
            });
        }

        if(!vgames){

            return res.status(404).send({
                status: "error",
                message: "No existe el videojuego"
            });
        }

        return res.status(200).send({
            status: "success",
            games: vgames
        });

    });
};

//remove categoryById
ctrlvg.delete = (req, res) => {

    var vgameId = req.params.id;

    // Find and delete por vgameID 
    Videogame.findOneAndDelete({_id: vgameId}, (err, vgameRemoved) => {

        if(err){

            return res.status(500).send({
                status: "error",
                message: "Error en la peticion"
            });
        }

        if(!vgameRemoved){

            return res.status(404).send({
                status: "error",
                message: "No se ha podido borrado el videojuego"
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: 'success',
            game: vgameRemoved
        });
    });

};

ctrlvg.getVideogame = (req, res) => {

    var vgameId = req.params.id;

    // Find por id del topic
    Videogame.findById(vgameId)
         .populate('category')
         .exec((err, vgame) => {

            if(err){

                return res.status(500).send({
                    status: "error",
                    message: "Error en la peticion"
                });
            }

            if(!vgame){

                return res.status(404).send({
                    status: "error",
                    message: "No existe el videojuego"
                });
            }

            return res.status(200).send({
                status: "success",
                game: vgame
            });

         });
};

ctrlvg.uploadphoto = (req, res) => {

    // Recoger el fichero de la peticion
    var file_name = 'Avatar no subido';
    

    //comprobamos si nuestra variable global files esta vacia
    if(!req.file){

        res.status(404).send({ 
            status: 'error',
            message: file_name
        });

    }

    // Conseguir el nombre y la extension del archivo subido
    var file_path = req.file.path;
    
    var file_split = file_path.split('\\');
    var file_name = file_split[3]; // para obtener el nombre de la imagen    

    //si requerimos el obtener la extension de la imagen 
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    // Comprobar extension (solo imagenes), si no es valida borrar fichero subido
    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jfif'){

        // Sacar el id del videojuego asignado
        var vgameId = req.params.vgameId;

        // Buscar y actualizar documento bd
        Videogame.findByIdAndUpdate({_id: vgameId}, { photo: file_name }, {new: true}, (err, vgameUpdated) => {

            if(err){
        
                res.status(500).send({ 
                    message: 'Error al guardar la imagen'
                });
            }
    
            if(!vgameUpdated){

                res.status(500).send({ 
                    message: 'Error al guardar la imagen'
                });
            }
            
            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                game: vgameUpdated
            });
            
        });

    }else {
    
        fs.unlink(file_path, (err) => {

            return res.status(200).send({
                status: 'error',
                message: 'La extension del archivo no es valida.'
            });
        });

    }

};

ctrlvg.getImageFile = (req, res) => {

    const imageFile = req.params.imageFile;
    const path_file = './src/uploads/videogames/'+ imageFile;

    fs.exists(path_file, (exists) => {
        if(exists){
            
            res.sendFile(path.resolve(path_file));
        }else{
            
            res.status(200).send({ message: 'No existe la imagen...'});
        }
    });
};

module.exports = ctrlvg;