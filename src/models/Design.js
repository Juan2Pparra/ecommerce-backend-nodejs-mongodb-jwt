const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: Number,
  imagen: String,
  creador: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Design', designSchema);
