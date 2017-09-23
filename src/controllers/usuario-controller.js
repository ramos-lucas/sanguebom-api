const Validacao = require('../validators/validacao');
const repository = require('../repositories/usuario-repository');
const md5 = require('md5');

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

exports.getByUsername = async(req, res, next) => {
    try{
        var data = await repository.getByUsername(req.params.username);
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
    contrato.usernameFormat(req.body.username, 'O nome de usuário deve conter de 5 a 20 caracteres, sendo letras (excluindo acentos), números e underline.');

    if (!contrato.isValid()) {
        res.status(400).send(contrato.errors()).end();
        return;
    }

    try{
        await repository.create({
                nome: req.body.nome,
                username: req.body.username,
                senha: md5(req.body.senha + global.SALT_KEY),
                cpf: req.body.cpf,
                email: req.body.email,
                telefone: req.body.telefone,
                dt_nascimento: req.body.dt_nascimento,
                avatar: req.body.avatar,
                sangue: req.body.sangue,
                permissao: req.body.permissao,
                localizacao: req.body.localizacao
        });
        res.status(201).send({
            message: 'Usuario cadastrado com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o usuário!',
            data: e
        });
    }
};

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


exports.criarDoacao = async(req, res, next) => {
    try{
        await repository.criarDoacao(req.params.id, req.body);
        res.status(200).send({
            message: 'Doacao cadastrada com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cadastrar doacao',
            data: e
        });
    }
};