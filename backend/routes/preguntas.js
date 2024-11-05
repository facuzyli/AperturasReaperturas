const express = require('express');
const router = express.Router();
const { obtenerPreguntas } = require('../controllers/preguntaController');

router.get('/', obtenerPreguntas);

module.exports = router;
