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
        type: String, required: true, trim: true, unique: true
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
    permissao: {
        type: String,
        enum: ['admin','user'], 
        default: 'user'
    },
    localizacao: {
        latitude: {type: Number},
        longitude: {type: Number},
        bairro: {type: String}        
    },
    doacoes: [{
        dt_criacao: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ['criada', 'agendada', 'concluida', 'cancelada'],
            default: 'criada'
        },
        dt_doacao: {
            type: Date
        },
        pontuacao: {
            type: Number,
            default: 0
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