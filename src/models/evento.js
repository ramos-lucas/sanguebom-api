const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: {
        type: String, trim: true, required: true
    },
    texto: {
        type: String, trim: true, required: true
    },
    imagem: {
        type: String, trim: true, default: 'evento.jpg'
    },
    dt_inicio: {
        type: Date, required: true
    },
    dt_criacao: {
        type: Date, default: Date.now
    },
    pontuacao: {
        type: Number, default: 0
    },
    localizacao: {
        latitude: {type: Number},
        longitude: {type: Number},
        endereco: {type: String},
        complemento: {type: String},
        bairro: {type: String}
    },
    interessados:  [
        new Schema({
            usuario: {
                type: Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        }, { _id: false })
    ],
    compareceram:  [
        new Schema({
            usuario: {
                type: Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        }, { _id: false })
    ]
});

module.exports = mongoose.model('Evento', schema);