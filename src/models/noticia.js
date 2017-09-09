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
    dt_criacao: {
        type: Date, default: Date.now()
    }
});

module.exports = mongoose.model('Noticia', schema);