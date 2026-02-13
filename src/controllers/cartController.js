const Cart = require('../models/Cart');


// OBTENER CARRITO
exports.obtenerCarrito = async (req, res) => {
  try {
    const carrito = await Cart.findOne({ usuarioId: req.usuario.id })
      .populate('productos.productoId');

    if (!carrito) {
      return res.json({ productos: [] });
    }

    res.json(carrito);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al obtener carrito' });
  }
};



// AGREGAR PRODUCTO
exports.agregarAlCarrito = async (req, res) => {
  try {
    const { productoId, talla, cantidad } = req.body;

    let carrito = await Cart.findOne({ usuarioId: req.usuario.id });

    if (!carrito) {
      carrito = new Cart({
        usuarioId: req.usuario.id,
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

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};



// ELIMINAR PRODUCTO
exports.eliminarDelCarrito = async (req, res) => {
  try {
    const { productoId, talla } = req.body;

    const carrito = await Cart.findOne({ usuarioId: req.usuario.id });

    carrito.productos = carrito.productos.filter(
      p => !(p.productoId.toString() === productoId && p.talla === talla)
    );

    await carrito.save();

    res.json({ message: 'Producto eliminado' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};
