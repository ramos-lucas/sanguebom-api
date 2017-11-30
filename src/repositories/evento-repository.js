const mongoose = require('mongoose');
const Evento = mongoose.model('Evento');

exports.get = async () => {
    const res = await Evento.find({}).sort({ dt_inicio: -1 });
    return res;
}

exports.getById = async (id) => {
    const res = await Evento
        .findById(id)
        .populate('interessados.usuario', 'nome cpf')
        .populate('compareceram.usuario', 'nome cpf');
    return res;
}

exports.create = async (data) => {
    var evento = new Evento(data);
    await evento.save()
}

exports.update = async (id, data) => {
    await Evento
        .findByIdAndUpdate(id, {
            $set: {
                'titulo': data.titulo,
                'texto': data.texto,
                'imagem': data.imagem,
                'dt_inicio': data.dt_inicio,
                'pontuacao': data.pontuacao,
                'localizacao': data.localizacao
            }
        });
}

exports.delete = async (id) => {
    await Evento
        .findByIdAndRemove(id);
}

exports.adicionarInteresse = async (id_evento, id_usuario) => {
    await Evento
        .findByIdAndUpdate(id_evento, {
            $push: {
                'interessados': {
                    'usuario': id_usuario
                }
            }
        });
}

exports.removerInteresse = async (id_evento, id_usuario) => {
    await Evento
        .findByIdAndUpdate(id_evento, {
            $pull: {
                'interessados': {
                    'usuario': id_usuario
                }
            }
        });
}

exports.compareceu = async (id_evento, id_usuario) => {
    await Evento
        .findByIdAndUpdate(id_evento, {
            $push: {
                'compareceram': {
                    'usuario': id_usuario
                }
            }
        });
}