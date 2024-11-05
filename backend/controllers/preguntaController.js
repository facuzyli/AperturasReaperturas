const Pregunta = require('../models/Pregunta');

exports.obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
