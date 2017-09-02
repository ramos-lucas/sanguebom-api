const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = express.Router();

// conecta ao mongo
mongoose.connect('mongodb://localhost/sanguebom', { useMongoClient: true} );

// carrega os models
const usuarioModel = require('./models/usuario');
const localizacaoModel = require('./models/localizacao');
const noticiaModel = require('./models/noticia');

// carrega as rotas
const indexRoute = require('./routes/index-route');
const usuarioRoute = require('./routes/usuario-route');
const noticiaRoute = require('./routes/noticia-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));
app.use(cors());

app.use('/', indexRoute);
app.use('/usuarios', usuarioRoute);
app.use('/noticias', noticiaRoute);
module.exports = app;