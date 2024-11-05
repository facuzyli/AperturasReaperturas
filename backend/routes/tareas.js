const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  obtenerTareasPorArea,
  actualizarEstadoTarea,
  agregarComentario,
} = require('../controllers/tareaController');

// Ruta para obtener tareas por área
router.get('/', auth, obtenerTareasPorArea);

// Ruta para actualizar el estado de una tarea
router.put('/:tareaId/estado', auth, actualizarEstadoTarea);

// Ruta para agregar un comentario a una tarea
router.post('/:tareaId/comentarios', auth, agregarComentario);

module.exports = router;
