const Validacao = require('../validators/validacao');
const repository = require('../repositories/usuario-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

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
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.criarDoacao(data.id, req.body);
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

exports.authenticate = async(req, res, next) => {
    try{
        const usuario = await repository.authenticate({
                username: req.body.username,
                senha: md5(req.body.senha + global.SALT_KEY)
        });

        if(!usuario){
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: usuario._id,
            username: usuario.username,
            nome: usuario.nome
        })

        res.status(201).send({
            token: token,
            data: {
                id: usuario.id,
                username: usuario.username,
                nome: usuario.nome
            }
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao autenticar!',
            data: e
        });
    }
};

exports.refreshToken = async(req, res, next) => {
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const usuario = await repository.getById(data.id);

        if(!usuario){
            res.status(404).send({
                message: 'Usuário não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: usuario._id,
            username: usuario.username,
            nome: usuario.nome
        })

        res.status(201).send({
            token: tokenData,
            data: {
                id: usuario.id,
                username: usuario.username,
                nome: usuario.nome
            }
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao autenticar!',
            data: e
        });
    }
};