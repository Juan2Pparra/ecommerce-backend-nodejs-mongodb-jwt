const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      talla: String,
      cantidad: Number
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
