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
    dt_cricao: {
        type: Date, default: Date.now()
    }
});

module.exports = mongoose.model('Noticia', schema);