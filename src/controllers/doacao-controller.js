const repository = require('../repositories/doacao-repository');
const authService = require('../services/auth-service');

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
        await repository.create(req.body);
        res.status(201).send({
            message: 'Doação cadastrada com sucesso!'
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

/* 
exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Usuario atualizado com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao atualizar o usuário',
            data: e
        });
    }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Usuario removido com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao remover o usuário',
            data: e
        });
    }
};
 */