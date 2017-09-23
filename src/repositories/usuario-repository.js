const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.get = async() => {
    const res = await Usuario.find({});
    return res;
}

exports.getByUsername = async(username) => {
    const res = await Usuario
        .findOne({
            username: username
        }).populate('participacoes.evento', 'titulo dt_inicio pontuacao');

    return res;
}

exports.getById = async(id) => {
    const res = await Usuario
        .findById(id).populate('participacoes.evento', 'titulo dt_inicio pontuacao');
    return res;
}

exports.create = async(data) => {
    var usuario = new Usuario(data);
    await usuario.save();
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
        .findByIdAndRemove(id);
}

exports.criarDoacao = async(id, data) => {
    
    await Usuario
        .update(
            { _id: id }, 
            { $push: { doacoes: data } }
        );
}

exports.authenticate = async(data) => {
    const res = await Usuario.findOne({
        username: data.username,
        senha: data.senha
    });
    return res;
}