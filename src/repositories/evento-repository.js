const mongoose = require('mongoose');
const Evento = mongoose.model('Evento');

exports.get = async() => {
    const res = await Evento.find({});
    return res;
}

exports.getById = async(id) => {
    const res = await Evento
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var evento = new Evento(data);
    await evento.save()
}

exports.update = async(id, data) => {
    await Evento
        .findByIdAndUpdate(id, {
            $set: {
                'titulo': data.titulo,
                'texto': data.texto,
                'imagem': data.imagem,
                'dt_inicio': data.dt_inicio,
                'pontuacao': data.pontuacao
            }
        });
}

exports.delete = async(id) => {
    await Evento
        .findOneAndRemove(id);
}