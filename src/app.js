const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();
const router = express.Router();

// conecta ao mongo
mongoose.connect(config.mongoConnection, { useMongoClient: true} );

// carrega os models
const usuarioModel = require('./models/usuario');
const noticiaModel = require('./models/noticia');
const eventoModel = require('./models/evento');

// carrega as rotas
const indexRoute = require('./routes/index-route');
const usuarioRoute = require('./routes/usuario-route');
const noticiaRoute = require('./routes/noticia-route');
const eventoRoute = require('./routes/evento-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

//habilita cors básico para testes
app.use(cors());

//cors balta
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });

//define rotas
app.use('/', indexRoute);
app.use('/usuarios', usuarioRoute);
app.use('/noticias', noticiaRoute);
app.use('/eventos', eventoRoute);

module.exports = app;