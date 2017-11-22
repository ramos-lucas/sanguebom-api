const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Doacao = mongoose.model('Doacao');

exports.getUltimaDoacao = async(id) => {
    const res = await Doacao
        .findOne({ usuario: id }).
        sort({
          dt_criacao: -1
        }).
        limit(1);
    return res;
}

exports.getCriadas = async() => {
    const res = await Doacao
        .find({ status: 'criada' })
        .populate('usuario', 'sangue localizacao nome');
    return res;
}
exports.getAgendadas = async() => {
    const res = await Doacao
        .find({ status: 'agendada' })
        .populate('usuario', 'sangue localizacao');
    return res;
}
exports.getConcluidas = async() => {
    const res = await Doacao
        .find({ status: 'concluida' })
        .populate('usuario', 'sangue localizacao');
    return res;
}
exports.getCanceladas = async() => {
    const res = await Doacao
        .find({ status: 'cancelada' })
        .populate('usuario', 'sangue localizacao');
    return res;
}
/* 
exports.getByUsername = async(username) => {
    const res = await Usuario
        .findOne({
            username: username
        }).populate('participacoes.evento', 'titulo dt_inicio pontuacao');

    return res;
}
 */

 exports.create = async(data) => {
    var doacao = new Doacao(data);
    await doacao.save();    
    return doacao;
}

exports.agendar = async(data) => {
    await Doacao
        .findOneAndUpdate(data.id, {
            $set: {
                'status': 'agendada',
                'dt_doacao': data.dt_doacao,
                'localizacao': data.localizacao
            }
        })
}

exports.concluir = async(data) => {
    await Doacao
        .findOneAndUpdate(data.id, {
            $set: {
                'status': 'concluida',
                'pontuacao': 20
            }
        })
}

exports.cancelar = async(data) => {
    await Doacao
        .findOneAndUpdate(data.id, {
            $set: {
                'status': 'cancelada',
                'pontuacao': 0
            }
        })
}

/* exports.update = async(id, data) => {
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
 */
/* 
exports.criarDoacao = async(id, data) => {
    
    await Usuario
        .update(
            { _id: id }, 
            { $push: { doacoes: data } }
        );
}
 */