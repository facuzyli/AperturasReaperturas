const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
  apertura: { type: mongoose.Schema.Types.ObjectId, ref: 'Apertura', required: true },
  pregunta: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: true },
  respuesta: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model('Respuesta', RespuestaSchema);
