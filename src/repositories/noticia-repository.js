const mongoose = require('mongoose');
const Noticia = mongoose.model('Noticia');

exports.get = async() => {
    const res = await Noticia.find({}).sort({dt_criacao: -1});
    return res;
}

exports.getById = async(id) => {
    const res = await Noticia
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var noticia = new Noticia(data);
    await noticia.save()
}

exports.update = async(id, data) => {
    await Noticia
        .findByIdAndUpdate(id, {
            $set: {
                'titulo': data.titulo,
                'texto': data.texto,
                'imagem': data.imagem
            }
        });
}

exports.delete = async(id) => {
    await Noticia
        .findByIdAndRemove(id);
}