const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.get = () => {
    return Usuario
        .find({});
}

exports.getByUsername = (username) => {
    return Usuario
        .findOne({
            username: username
        });
}

exports.getById = (id) => {
    return Usuario
        .findById(id);
}

exports.create = (data) => {
    var usuario = new Usuario(data);
    return usuario.save()
}

exports.update = (id, data) => {
    return Usuario
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

exports.delete = (id) => {
    return Usuario
        .findOneAndRemove(id);
}