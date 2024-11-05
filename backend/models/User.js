const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['encargado', 'area', 'directivo'], required: true },
  area: { type: String }, // Solo si el rol es 'area'
});

module.exports = mongoose.model('User', UserSchema);
