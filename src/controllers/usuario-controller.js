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

exports.getDoadores = async(req, res, next) => {
    try {
        var data = await repository.getDoadores();
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
        if(data == null)
        res.status(200).send({data : null});        
        
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição',
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
                cpf: req.body.cpf,
                email: req.body.email,
                telefone: req.body.telefone,
                dt_nascimento: req.body.dt_nascimento,
                avatar: req.body.avatar,
                sangue: req.body.sangue,
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


exports.inserirDoacao = async(idUsuario, doacao) => {
  
    var status = {};
    try{
        await repository.inserirDoacao(idUsuario, doacao._id);  
        status.message = 'Doacao inserida com sucesso!';
        return status
    } catch(e) {            
        status.message = 'Falha ao inserir doacao';
        status.data = e;        
        return status;
    }
};

exports.authenticate = async(req, res, next) => {
    try{
        const usuario = await repository.authenticate({
                email: req.body.email,
                senha: md5(req.body.senha + global.SALT_KEY)
        });

        if(!usuario){
            res.status(403).send({
                message: 'E-mail ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: usuario._id,
            nome: usuario.nome,
            username: usuario.username,
            cpf: usuario.cpf,
            email: usuario.email,
            telefone: usuario.telefone,
            dt_nascimento: usuario.dt_nascimento,
            avatar: usuario.avatar,
            sangue: usuario.sangue
        })

        res.status(201).send({
            token: token,
            data: {
                id: usuario._id,
                nome: usuario.nome,
                username: usuario.username,
                cpf: usuario.cpf,
                email: usuario.email,
                telefone: usuario.telefone,
                dt_nascimento: usuario.dt_nascimento,
                avatar: usuario.avatar,
                sangue: usuario.sangue
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
            nome: usuario.nome,
            username: usuario.username,
            cpf: usuario.cpf,
            email: usuario.email,
            telefone: usuario.telefone,
            dt_nascimento: usuario.dt_nascimento,
            avatar: usuario.avatar,
            sangue: usuario.sangue
        })

        res.status(201).send({
            id: usuario._id,
            nome: usuario.nome,
            username: usuario.username,
            cpf: usuario.cpf,
            email: usuario.email,
            telefone: usuario.telefone,
            dt_nascimento: usuario.dt_nascimento,
            avatar: usuario.avatar,
            sangue: usuario.sangue
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao autenticar!',
            data: e
        });
    }
};