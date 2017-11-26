const repository = require('../repositories/doacao-repository');
const usuarioController = require('../controllers/usuario-controller');
const authService = require('../services/auth-service');

// exports.getUltimaDoacao = async(req, res, next) => {
//     try {
//         var data = await repository.getUltimaDoacao(req.params.id);
//         res.status(200).send(data);
//     } catch(e) {
//         res.status(400).send({
//             message: 'Falha ao processar sua requisição',
//             data: e
//         });
//     }
// };

exports.getCriadas = async(req, res, next) => {
    try {
        var data = await repository.getCriadas();
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};
exports.getAgendadas = async(req, res, next) => {
    try {
        var data = await repository.getAgendadas();
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};
exports.getConcluidas = async(req, res, next) => {
    try {
        var data = await repository.getConcluidas();
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};
exports.getCanceladas = async(req, res, next) => {
    try {
        var data = await repository.getCanceladas();
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};
exports.post = async(req, res, next) => {
    try{
        var doacao = await repository.create(req.body);   
        var status = usuarioController.inserirDoacao(req.body.usuario, doacao);
        await usuarioController.alterarLocalizacao(req.body.usuario, req.body.localizacao);

        res.status(201).send({
            message: 'Doação cadastrada com sucesso!',
            doacao: doacao.id
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cadastrar a doação!',
            data: e
        });
    }
};

exports.agendar = async(req, res, next) => {
    try{
        await repository.agendar(req.body);
        res.status(201).send({
            message: 'Doação agendada com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao agendar a doação!',
            data: e
        });
    }
};
exports.concluir = async(req, res, next) => {
    try{
        await repository.concluir(req.body);
        res.status(201).send({
            message: 'Doação concluída!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao concluir doação!',
            data: e
        });
    }
};
exports.cancelar = async(req, res, next) => {
    try{
        await repository.cancelar(req.body);
        res.status(201).send({
            message: 'Doação cancelada com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cancelar a doação!',
            data: e
        });
    }
};

exports.aptoDoar = async(req, res, next) => {
    try{
        const data = await repository.aptoDoar(req.params.id);
        res.status(201).send(data);
    } catch(e){
        res.status(400).send({
            message: 'Erro!',
            data: e
        });
    }
}

exports.getDoacaoById = async(req, res, next) => {
    try {
        const data = await repository.getDoacaoById(req.params.id);
        res.status(201).send(data);
    } catch (e){
        res.status(400).send({
            message: 'Erro!',
            data: e
        });
    }
}

exports.getDoacoesDeHoje = async(req, res, next) => {
    try {
        const data = await repository.getDoacoesDeHoje();
        res.status(201).send(data);
    } catch (e){
        res.status(400).send({
            message: 'Erro!',
            data: e
        });
    }
}