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
    sexo: {
        type: String, enum: ['M', 'F'], required: true
    },
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
    doacoes: [
        new Schema({
            doacao: {
                type: Schema.Types.ObjectId,
                ref: 'Doacao'
            }
        }, { _id: false })
    ],
    participacoes: [
        new Schema({
            evento: {
                type: Schema.Types.ObjectId,
                ref: 'Evento'
            },
            status: {
                type: String,
                enum: ['interessado', 'compareceu'],
                default: 'interessado'
            },
            pontuacao: {
                type: Number,
                default: 0
            }
        }, { _id: false })
    ]
});


module.exports = mongoose.model('Usuario', schema);