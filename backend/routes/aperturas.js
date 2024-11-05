const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { crearApertura, obtenerAperturas } = require('../controllers/aperturaController');

// Crear una nueva apertura
router.post('/', auth, crearApertura);

// Obtener todas las aperturas
router.get('/', auth, obtenerAperturas);

module.exports = router;
