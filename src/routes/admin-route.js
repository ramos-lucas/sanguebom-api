const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin-controller')
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/email/:email', controller.getByEmail);
router.get('/id/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', controller.refreshToken);
router.get('/valida-username/:username', controller.validaUsername);
router.get('/valida-email/:email', controller.validaEmail);

module.exports = router;