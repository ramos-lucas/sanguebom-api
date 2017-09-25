const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller')
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:username', controller.getByUsername);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.post('/criarDoacao', authService.authorize, controller.criarDoacao);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;