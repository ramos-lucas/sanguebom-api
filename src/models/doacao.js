const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    dt_criacao: {
        type: Date, default: Date.now()
    },
    status: {
        //tentar enum
        type: Number, default: 0
    },
    dt_doacao: {
        type: Date
    },
    pontuacao: {
        type: Number, default: 0
    }
});

module.exports = mongoose.model('Doacao', schema);