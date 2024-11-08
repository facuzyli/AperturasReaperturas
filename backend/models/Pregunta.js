const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema({
  area: { type: String, required: true },
  texto: { type: String, required: true },
  tipoRespuesta: { type: String, enum: ['texto', 'booleano', 'seleccion'], required: true },
  opciones: [{ type: String }], // Opciones para tipo 'seleccion'
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);
