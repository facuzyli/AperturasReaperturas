const mongoose = require('mongoose');

const AperturaSchema = new mongoose.Schema({
  numeroLocal: { type: Number, required: true },
  tipo: { type: String, enum: ['apertura', 'reapertura'], required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaApertura: { type: Date, required: true },
  encargado: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  estado: { type: String, enum: ['pendiente', 'en proceso', 'completada'], default: 'pendiente' },
});

module.exports = mongoose.model('Apertura', AperturaSchema);
