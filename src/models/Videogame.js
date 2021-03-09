'use strict'
const { Schema, model } = require('mongoose');
//extraemos una propiedad de mongoose
//model: nos sirve para interactuar con la base de datos

const videogameSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
            maxlength: 32,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            require: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            require: true,
            maxlength: 2000
        },
        category: {
            type: Schema.ObjectId, 
            ref: 'Category',
            require: true
        },
        quantity: {
            type: Number
        },
        photo: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = model('Videogame', videogameSchema);