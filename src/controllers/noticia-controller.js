const Validacao = require('../validators/validacao');
const repository = require('../repositories/noticia-repository');

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
            message: 'Noticia cadastrada com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cadastrar a noticia!',
            data: e
        });
    }
};

exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Notícia atualizada com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao atualizar a notícia',
            data: e
        });
    }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Notícia removida com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao remover a noticia',
            data: e
        });
    }
};