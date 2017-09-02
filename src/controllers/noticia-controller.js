const mongoose = require('mongoose');
const Noticia = mongoose.model('Noticia');

exports.get = (req, res, next) => {
    Noticia
        .find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};

exports.getById = (req, res, next) => {
    Noticia
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    var noticia = new Noticia(req.body);
    noticia
        .save()
        .then(x => {
            res.status(201).send({
                message: 'Notícia cadastrada com sucesso!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao cadatrar a notícia',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    Noticia
        .findByIdAndUpdate(req.params.id, {
            $set: {
                'titulo' : req.body.titulo,
                'texto' : req.body.texto,
                'imagem' : req.body.imagem
            }
        })
        .then(x => {
            res.status(200).send({
                message: 'Notícia atualizada com sucesso'
            })
        })
        .catch(e => {
            res.status(400).send({
                message: 'Erro ao atualizar a notícia',
                data: e
            })
        });
};

exports.delete = (req, res, next) => {
    Noticia
        .findOneAndRemove(req.params.id)
        .then(x => {
            res.status(200).send({
                message: 'Notícia excluída com sucesso!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Erro ao excluir a notícia'
            });
        });
};