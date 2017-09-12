const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: {
        type: String, trim: true, required: true
    },
    texto: {
        type: String, trim: true, required: true
    },
    imagem: {
        type: String, trim: true, default: ''
    },
    dt_inicio: {
        type: Date, required: true
    },
    pontuacao: {
        type: Number, default: 0
    },
    localizacao: {
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        logradouro: {type: String},
        numero: {type: Number},
        complemento: {type: String},
        bairro: {type: String}
    }
});

module.exports = mongoose.model('Evento', schema);