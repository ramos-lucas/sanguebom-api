const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller')
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:username', controller.getByUsername);
router.get('/email/:email', controller.getByEmail);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.post('/criarDoacao', controller.criarDoacao);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', controller.refreshToken);
router.get('/valida-username/:username', controller.validaUsername);
router.get('/valida-email/:email', controller.validaEmail);

module.exports = router;