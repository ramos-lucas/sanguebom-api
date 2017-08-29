const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    logradouro: {
        type: String, trim: true
    },
    numero: {
        type: Number
    },
    complemento: {
        type: String
    },
    cep: {
        type: String, trim: true
    },
    bairro: {
        type: String, trim: true
    },
    latitude: {
        type: Number, required: true
    },
    longitude: {
        type: Number, required: true
    }
});

module.exports = mongoose.model('Localizacao', schema);