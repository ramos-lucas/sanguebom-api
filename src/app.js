const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// conecta ao mongo
mongoose.connect('mongodb://localhost/sanguebom', { useMongoClient: true} );

// carrega os models
const usuarioModel = require('./models/usuario');

// carrega as rotas
const indexRoute = require('./routes/index-route');
const usuarioRoute = require('./routes/usuario-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use('/', indexRoute);
app.use('/usuarios', usuarioRoute);

module.exports = app;