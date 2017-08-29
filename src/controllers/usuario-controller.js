const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.get = (req, res, next) => {
    Usuario
        .find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.getByNickname = (req, res, next) => {
    Usuario
        .findOne({
            nickname: req.params.nickname
        }, 'nome nickname email')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.getById = (req, res, next) => {
    Usuario
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.post = (req, res, next) => {
    var usuario = new Usuario(req.body);
    usuario
        .save()
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
    Usuario
        .findByIdAndUpdate(req.params.id, {
            $set: {
                nome: req.body.nome,
                nickname: req.body.nickname,
                senha: req.body.senha,
                email: req.body.email
            }
        })
        .then(x => {
            res.status(201).send({
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
    Usuario
    .findOneAndRemove(req.params.id)
    .then(x => {
        res.status(201).send({
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