const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String, required: true, trim: true
    },
    username: {
        type: String, required: true, trim: true, unique: true
    },
    senha: {
        type: String, required: true
    },
    email: {
        type: String, required: true, trim: true, unique: true
    },
    dt_criacao: {
        type: Date, default: Date.now()
    }
});


module.exports = mongoose.model('Admin', schema);