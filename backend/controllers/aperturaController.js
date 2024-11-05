const Apertura = require('../models/Apertura');

// Crear una nueva apertura
exports.crearApertura = async (req, res) => {
  try {
    const { numeroLocal, tipo, fechaApertura } = req.body;

    const nuevaApertura = new Apertura({
      numeroLocal,
      tipo,
      fechaApertura,
      encargado: req.user.userId,
    });

    await nuevaApertura.save();

    res.status(201).json({ msg: 'Apertura creada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todas las aperturas
exports.obtenerAperturas = async (req, res) => {
  try {
    const aperturas = await Apertura.find().populate('encargado', 'nombre email');
    res.json(aperturas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
