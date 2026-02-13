const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true },
  precio: { type: Number, required: true },

  tipo: {
    type: String,
    enum: ['producto', 'diseno'],
    default: 'producto'
  },

  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, {
  collection: 'productos'
});

module.exports = mongoose.model('Product', productSchema);
