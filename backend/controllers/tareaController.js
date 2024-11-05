const Tarea = require('../models/Tarea');

// Controlador para obtener tareas de un área específica
exports.obtenerTareasPorArea = async (req, res) => {
  try {
    const area = req.user.area; // Asumimos que el usuario tiene un campo 'area'
    const tareas = await Tarea.find({ area }).populate('apertura');
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para actualizar el estado de una tarea
exports.actualizarEstadoTarea = async (req, res) => {
  try {
    const { tareaId } = req.params;
    const { estado } = req.body;

    // Actualizar el estado de la tarea
    await Tarea.findByIdAndUpdate(tareaId, { estado });

    res.json({ msg: 'Estado de la tarea actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para agregar un comentario a una tarea
exports.agregarComentario = async (req, res) => {
  try {
    const { tareaId } = req.params;
    const { contenido } = req.body;

    // Crear nuevo comentario
    const comentario = {
      usuario: req.user.userId,
      contenido,
    };

    // Agregar comentario a la tarea
    await Tarea.findByIdAndUpdate(tareaId, { $push: { comentarios: comentario } });

    res.json({ msg: 'Comentario agregado a la tarea' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
