const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

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
    const id = req.params.id;
    res.status(200).send({ 
        id: id, 
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};