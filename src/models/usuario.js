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
    cpf: {
        type: String, trim: true
    },
    email: {
        type: String, required: true, trim: true, unique: true
    },
    telefone: {
        type: String, trim: true
    },
    dt_nascimento: Date,
    avatar: {
        type: String, default: 'avatar1.png'
    },
    sangue: {
        tipo: String,
        fator: String
    },
    localizacao: {
        lat: Number,
        long: Number,
        bairro: String
    },
    doacoes: [{
        doacao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doacao'
        }
    }],
    participacoes: [{
        evento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Evento'
        },
        status: {
            type: String,
            enum: ['interessado', 'compareceu']
        },
        pontuacao: {
            type: Number,
            default: 0
        }
    }]
});


module.exports = mongoose.model('Usuario', schema);