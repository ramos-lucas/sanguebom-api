const express = require('express');
const router = express.Router();
const controller = require('../controllers/doacao-controller')
const authService = require('../services/auth-service');

router.get('/', controller.getCriadas);
router.get('/agendadas', controller.getAgendadas);
router.get('/concluidas', controller.getConcluidas);
router.get('/canceladas', controller.getCanceladas);
router.post('/', controller.post);
router.post('/agendar', controller.agendar);
router.post('/concluir', controller.concluir);
router.post('/cancelar', controller.cancelar);
//router.get('/ultimaDoacao/:id', controller.getUltimaDoacao);
router.get('/aptoDoar/:id', controller.aptoDoar);
router.get('/id/:id', controller.getDoacaoById);
router.get('/agendadas/hoje', controller.getDoacoesDeHoje);
// router.put('/:id', controller.put);
// router.delete('/:id', controller.delete);
module.exports = router;