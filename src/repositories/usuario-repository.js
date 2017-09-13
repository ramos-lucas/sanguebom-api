const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.get = async() => {
    const res = await Usuario.find({}).populate('participacoes.evento', 'titulo dt_inicio pontuacao');
    return res;
}

exports.getByUsername = async(username) => {
    const res = await Usuario
        .findOne({
            username: username
        });
    return res;
}

exports.getById = async(id) => {
    const res = await Usuario
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var usuario = new Usuario(data);
    await usuario.save()
}

exports.update = async(id, data) => {
    await Usuario
        .findByIdAndUpdate(id, {
            $set: {
                'nome': data.nome,
                'username': data.username,
                'senha': data.senha,
                'cpf': data.cpf,
                'email': data.email,
                'telefone': data.telefone,
                'dtNascimento': data.dtNascimento,
                'avatar': data.avatar,
                'sangue': {
                    'tipo': data.sangue.tipo,
                    'fator': data.sangue.fator
                }
            }
        });
}

exports.delete = async(id) => {
    await Usuario
        .findOneAndRemove(id);
}