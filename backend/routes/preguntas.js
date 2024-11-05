const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { obtenerPreguntas, crearPregunta } = require('../controllers/preguntaController');

// Ruta para obtener todas las preguntas
router.get('/', auth, obtenerPreguntas);

// Ruta para crear una nueva pregunta (solo para usuarios de área)
router.post('/', auth, crearPregunta);

module.exports = router;
