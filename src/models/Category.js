'use strict'
const { Schema, model } = require('mongoose');
//extraemos una propiedad de mongoose
//model: nos sirve para interactuar con la base de datos

const categorySchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            maxlength: 32,
            unique: true
        }    
    },
    {
        timestamps: true
    }
);

module.exports = model('Category', categorySchema);