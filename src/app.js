const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

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