const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Localizacao = require('./localizacao')
const LocalizacaoSchema = require('mongoose').model('Localizacao').schema;

const schema = new Schema({
    nome: {
        type: String, required: true, trim: true
    },
    username: {
        type: String, required: true, trim: true, index: true, unique: true
    },
    senha: {
        type: String, required: true
    },
    cpf: {
        type: String, required: true, trim: true, unique: true
    },
    email: {
        type: String, required: true, trim: true, unique: true
    },
    telefone: {
        type: String, trim: true
    },
    dt_nascimento: Date,
    avatar: String,
    sangue: {
        tipo: String,
        fator: String
    },
    permissao: {
        type: String,
        enum: ['admin','user'], 
        default: 'user'
    },
    localizacao: {
        type: LocalizacaoSchema
    }

});


module.exports = mongoose.model('Usuario', schema);