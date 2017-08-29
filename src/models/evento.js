const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: {
        type: String, trim: true, required: true
    },
    texto: {
        type: Text, trim: true, required: true
    },
    imagem: {
        type: String, trim: true, default: ''
    },
    dt_inicio: {
        type: Date, required: true
    },
    pontuacao: {
        type: Number, default: 0
    }
});

module.exports = mongoose.model('Evento', schema);