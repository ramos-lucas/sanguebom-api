const Validacao = require('../validators/validacao');
const repository = require('../repositories/evento-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};

exports.getById = async(req, res, next) => {
    try{
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};

exports.post = async(req, res, next) => {
    let contrato = new Validacao();

    if (!contrato.isValid()) {
        res.status(400).send(contrato.errors()).end();
        return;
    }

    try{
        await repository.create(req.body);
        res.status(201).send({
            message: 'Evento cadastrado com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o evento!',
            data: e
        });
    }
};

exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Evento atualizado com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao atualizar o evento',
            data: e
        });
    }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Evento removido com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao remover o evento',
            data: e
        });
    }
};