const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  apertura: { type: mongoose.Schema.Types.ObjectId, ref: 'Apertura', required: true },
  area: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: String, enum: ['pendiente', 'en proceso', 'completada', 'inconveniente'], default: 'pendiente' },
  comentarios: [
    {
      usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      contenido: { type: String },
      fecha: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Tarea', TareaSchema);
