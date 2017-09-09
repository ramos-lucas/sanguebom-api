const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller')

router.get('/', controller.get);
router.get('/:username', controller.getByUsername);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;