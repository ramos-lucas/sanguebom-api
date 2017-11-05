const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

exports.get = async() => {
    const res = await Admin.find();
    return res;
}

exports.getByEmail = async(email) => {
    const res = await Admin
        .findOne({
            email: email
        }, 'email');
    return res;
}
exports.getByUsername = async(username) => {
    const res = await Admin
        .findOne({
            username: username
        }, 'username');
    return res;
}

exports.getById = async(id) => {
    const res = await Admin
        .findById(id).populate('participacoes.evento', 'titulo dt_inicio pontuacao');
    return res;
}

exports.create = async(data) => {
    console.log(data);
    var admin = new Admin(data);
    await admin.save();
}

exports.update = async(id, data) => {
    await Admin
        .findByIdAndUpdate(id, {
            $set: {
                'nome': data.nome,
                'username': data.username,
                'senha': data.senha,
                'email': data.email
            }
        });
}

exports.delete = async(id) => {
    await Admin
        .findByIdAndRemove(id);
}

exports.authenticate = async(data) => {
    const res = await Admin.findOne({
        email: data.email,
        senha: data.senha
    });
    return res;
}