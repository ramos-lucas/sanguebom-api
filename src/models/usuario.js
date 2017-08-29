const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    telefone: {
        type: String,
        trim: true
    },
    dt_nascimento: {
        type: Date
    },
    avatar: {
        type: String
    },
    permissao: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Usuario', schema);