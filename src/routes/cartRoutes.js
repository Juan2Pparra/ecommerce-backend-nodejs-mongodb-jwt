const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const Cart = require('../models/Cart');


// AGREGAR AL CARRITO
router.post('/add', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productoId, talla, cantidad } = req.body;

    let carrito = await Cart.findOne({ usuarioId: userId });

    if (!carrito) {
      carrito = new Cart({
        usuarioId: userId,
        productos: []
      });
    }

    const index = carrito.productos.findIndex(
      p => p.productoId.toString() === productoId && p.talla === talla
    );

    if (index !== -1) {
      carrito.productos[index].cantidad += cantidad;
    } else {
      carrito.productos.push({ productoId, talla, cantidad });
    }

    await carrito.save();

    res.json({ message: 'Producto agregado al carrito' });

  } catch (error) {
    console.error("ERROR ADD:", error);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
});


// OBTENER CARRITO
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const carrito = await Cart.findOne({ usuarioId: userId })
      .populate('productos.productoId');

    if (!carrito) return res.json({ productos: [] });

    res.json(carrito);

  } catch (error) {
    console.error("ERROR GET:", error);
    res.status(500).json({ message: 'Error al obtener carrito' });
  }
});


// ELIMINAR PRODUCTO
router.delete('/remove/:productoId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productoId } = req.params;

    const carrito = await Cart.findOne({ usuarioId: userId });

    if (!carrito) return res.json({ productos: [] });

    carrito.productos = carrito.productos.filter(
      p => p.productoId.toString() !== productoId
    );

    await carrito.save();

    res.json({ message: 'Producto eliminado del carrito' });

  } catch (error) {
    console.error("ERROR DELETE:", error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});


// ACTUALIZAR CANTIDAD
router.put('/update/:productoId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productoId } = req.params;
    const { cantidad } = req.body;

    const carrito = await Cart.findOne({ usuarioId: userId });

    const item = carrito.productos.find(
      p => p.productoId.toString() === productoId
    );

    if (!item) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    item.cantidad = cantidad;

    await carrito.save();

    res.json({ message: 'Cantidad actualizada' });

  } catch (error) {
    console.error("ERROR UPDATE:", error);
    res.status(500).json({ message: 'Error al actualizar cantidad' });
  }
});


module.exports = router;
