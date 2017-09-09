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
    cidade: {
        type: String, trim: true, default: 'São Carlos'
    },
    uf: {
        type: String, trim: true, default: 'SP'
    },
    latitude: {
        type: Number, required: true
    },
    longitude: {
        type: Number, required: true
    }
});

module.exports = mongoose.model('Localizacao', schema);