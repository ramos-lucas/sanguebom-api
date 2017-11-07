const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    dt_criacao: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['criada', 'agendada', 'concluida', 'cancelada'],
        default: 'criada'
    },
    dt_doacao: {
        type: Date
    },
    localizacao: {
        lat: {type: Number},
        long: {type: Number},
        bairro: {type: String}        
    },
    pontuacao: {
        type: Number,
        default: 0
    }
}, {collection: 'doacoes'});

module.exports = mongoose.model('Doacao', schema);