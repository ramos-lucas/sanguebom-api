const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Validacao = require('../validators/validacao');
const repository = require('../repositories/usuario-repository');

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.getByUsername = (req, res, next) => {
    repository
        .getByUsername(req.params.username)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.post = (req, res, next) => {
    let contrato = new Validacao();
    contrato.usernameFormat(req.body.username, 'O nome de usuário deve conter de 5 a 20 caracteres, sendo letras (excluindo acentos), números e underline.');

    if (!contrato.isValid()) {
        res.status(400).send(contrato.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({ 
                message: 'Usuario cadastrado com sucesso!'
            });
        })
        .catch(e => {
            res.status(400).send({ 
                message: 'Falha ao cadastrar o usuário!',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({
                message: 'Usuario atualizado com sucesso!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar o usuário',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    repository
        .delete(req.params.id)
        .then(x => {
            res.status(200).send({
                message: 'Usuario removido com sucesso!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o usuário',
                data: e
            });
        });
};