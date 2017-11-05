const Validacao = require('../validators/validacao');
const repository = require('../repositories/admin-repository');
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

exports.getByEmail = async(req, res, next) => {
    try{
        var data = await repository.getByEmail(req.params.email);
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
                email: req.body.email
        });
        res.status(201).send({
            message: 'Administrador cadastrado com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o administrador!',
            data: e
        });
    }
};

exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Administrador atualizado com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao atualizar o administrador',
            data: e
        });
    }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Administrador removido com sucesso!'
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao remover o administrador',
            data: e
        });
    }
};

exports.authenticate = async(req, res, next) => {
    try{
        const admin = await repository.authenticate({
                email: req.body.email,
                senha: md5(req.body.senha + global.SALT_KEY)
        });
        
        if(!admin){
            res.status(403).send({
                message: 'E-mail ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: admin._id,
            nome: admin.nome,
            username: admin.username,
            email: admin.email
        })

        res.status(201).send({
            token: token,
            data: {
                id: admin._id,
                nome: admin.nome,
                username: admin.username,
                email: admin.email
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

        const admin = await repository.getById(data.id);

        if(!admin){
            res.status(404).send({
                message: 'Administrador não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: admin._id,
            nome: admin.nome,
            username: admin.username,
            email: admin.email
        })

        res.status(201).send({
            id: admin._id,
            nome: admin.nome,
            username: admin.username,
            email: admin.email
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao autenticar!',
            data: e
        });
    }
};

exports.validaUsername = async(req, res, next) => {
    try{
        var data = await repository.getByUsername(req.params.username);
        if(data == null)
        res.status(200).send({data : true});        
        
        res.status(200).send({data : false});
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};

exports.validaEmail = async(req, res, next) => {
    try{
        var data = await repository.getByEmail(req.params.email);
        if(data == null)
        res.status(200).send({data : true});
        
        res.status(200).send({data : false});
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};