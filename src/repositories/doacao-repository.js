const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Doacao = mongoose.model('Doacao');
var moment = require('moment');

exports.getCriadas = async () => {
    console.log(moment());
    
    const res = await Doacao
        .find({ status: 'criada' })
        .populate('usuario', 'sangue localizacao nome telefone');
    return res;
}
exports.getAgendadas = async () => {
    const res = await Doacao
        .find({ status: 'agendada' })
        .populate('usuario', 'sangue localizacao nome telefone');
    return res;
}
exports.getConcluidas = async () => {
    const res = await Doacao
        .find({ status: 'concluida' })
        .populate('usuario', 'sangue localizacao');
    return res;
}
exports.getCanceladas = async () => {
    const res = await Doacao
        .find({ status: 'cancelada' })
        .populate('usuario', 'sangue localizacao');
    return res;
}

exports.create = async (data) => {
    var doacao = new Doacao(data);
    await doacao.save();
    return doacao;
}

exports.agendar = async (data) => {
    await Doacao
        .findByIdAndUpdate(data.id, {
            $set: {
                'status': 'agendada',
                'dt_doacao': data.dt_doacao,
                'localizacao': data.localizacao
            }
        })
}

exports.concluir = async (data) => {
    await Doacao
        .findByIdAndUpdate(data.id, {
            $set: {
                'status': 'concluida',
                'pontuacao': 20
            }
        })
}

exports.cancelar = async (data) => {
    console.log(data.id);
    await Doacao
        .findByIdAndUpdate(data.id, {
            $set: {
                'status': 'cancelada',
                'pontuacao': 0
            }
        })
}

var getUltimaDoacao = async (id) => {
    const res = await Doacao
        .findOne({ usuario: id })
        .sort({
            dt_criacao: -1
        })
        .limit(1)
        .populate('usuario', 'sexo');

    return res == null ? false : res;
}

exports.aptoDoar = async (id) => {
    // false ou doacao
    ultimaDoacao = await getUltimaDoacao(id);
    if (ultimaDoacao == false) {
        //nao tem doacao
        return { apto: true }
    } else {
        //tem doacao
        if (ultimaDoacao.status == "cancelada") {
            //ultima cancelada
            return { apto: true };
        }
        if (ultimaDoacao.status == "concluida") {
            //ultima concluida, calculando data
            var hoje = new Date();
            var aptoDoar = new Date();
            var prazo = ultimaDoacao.usuario.sexo == 'M' ? 90 : 120;

            aptoDoar.setDate(ultimaDoacao.dt_doacao.getDate() + prazo);
            var apto = hoje >= aptoDoar;
            if(apto){
                return { apto: true };
            }
            else{
                return {
                    apto: false,
                    ultimaDoacao: ultimaDoacao,
                    data_apto: aptoDoar
                }
            }
        }
        return {
            apto: false,
            ultimaDoacao: ultimaDoacao
        }
    }
}

exports.getDoacaoById = async (id) => {
    const res = await Doacao
        .findById(id);
    return res;
}

exports.getDoacoesDeHoje = async () => {
    var start = moment().startOf('day'); 
    var end = moment().endOf('day'); 
    console.log(start);
    console.log(end);
    const res = await Doacao
        .find({
            status: 'agendada', 
            dt_doacao: {
                $gte : start,
                $lt : end
            }
        })
        .populate('usuario', 'nome cpf telefone');
    return res;
}