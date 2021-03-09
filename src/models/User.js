'use strict'
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32
    },
    surname: {
        type: String,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    inventory: {
        type: Array,
        dafault: []
    },
    role: String,
    image: String
    
},
{timestamps: true});

// Para evitar enviar la password de un objeto de tipo password
userSchema.methods.toJSON = function(){

    var obj = this.toObject();
    delete obj.password;

    return obj;
}

module.exports = model('User', userSchema);