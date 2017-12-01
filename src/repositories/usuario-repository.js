const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.get = async () => {
    const res = await Usuario.find().populate('doacoes.doacao', 'dt_criacao status dt_doacao pontuacao');
    return res;
}

exports.getDoadores = async () => {
    const res = await Usuario.aggregate({ $group: { _id: "$sangue", quantidade: { $sum: 1 } } }, { $project: { _id: 0, sangue: "$_id", quantidade: "$quantidade" } })
    return res;
}

exports.getByUsername = async (username) => {
    const res = await Usuario
        .findOne({
            username: username
        }).populate('doacoes.doacao', 'dt_criacao status dt_doacao pontuacao');

    return res;
}

exports.getByEmail = async (email) => {
    const res = await Usuario
        .findOne({
            email: email
        }, 'email');
    return res;
}

exports.getById = async (id) => {
    const res = await Usuario
        .findById(id).populate('doacoes.doacao', 'dt_criacao status dt_doacao pontuacao');
    return res;
}

exports.create = async (data) => {
    var usuario = new Usuario(data);
    await usuario.save();
}

exports.update = async (id, data) => {
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

exports.delete = async (id) => {
    await Usuario
        .findByIdAndRemove(id);
}

exports.inserirDoacao = async (idUsuario, idDoacao) => {
    await Usuario
    .findByIdAndUpdate(idUsuario, {
        $push: {
            'doacoes': {
                'doacao': idDoacao
            }
        }
    });
}

exports.alterarLocalizacao = async (idUsuario, localizacao) => {
    await Usuario
    .findByIdAndUpdate(idUsuario, {
        $set: {
            'localizacao': localizacao
        }
    });
}

exports.authenticate = async (data) => {
    const res = await Usuario.findOne({
        email: data.email,
        senha: data.senha
    }).populate('doacoes.doacao', 'dt_criacao status localizacao dt_doacao');
    return res;
}

exports.adicionarInteresse = async (id_evento, id_usuario) => {
    await Usuario
        .findByIdAndUpdate(id_usuario, {
            $push: {
                'participacoes' : {
                    'evento': id_evento
                }
            }
        })
}

exports.removerInteresse = async (id_evento, id_usuario) => {
    await Usuario
        .findByIdAndUpdate(id_usuario, {
            $pull: {
                'participacoes' : {
                    'evento': id_evento
                }
            }
        })
}

exports.compareceu = async (id_evento, id_usuario, pontuacao) => {
    console.log(id_evento);
    console.log(id_usuario);
    console.log(pontuacao);
    var teste = await Usuario
        .update(
            {
              _id: id_usuario,
              "participacoes.evento": id_evento
            },
            {
                $set: {
                    "participacoes.$.status": "compareceu",
                    "participacoes.$.pontuacao": pontuacao
                }
            }
          );
    console.log(teste);
}