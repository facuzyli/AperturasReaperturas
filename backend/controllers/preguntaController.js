const Pregunta = require('../models/Pregunta');

// Controlador para obtener todas las preguntas
exports.obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para crear una nueva pregunta
exports.crearPregunta = async (req, res) => {
  try {
    const { texto, tipoRespuesta, opciones } = req.body;
    const area = req.user.area; // Asumimos que el usuario tiene un campo 'area'

    const nuevaPregunta = new Pregunta({ area, texto, tipoRespuesta, opciones });

    await nuevaPregunta.save();

    res.status(201).json({ msg: 'Pregunta creada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
