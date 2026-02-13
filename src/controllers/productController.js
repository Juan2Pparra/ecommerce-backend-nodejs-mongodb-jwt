const Product = require('../models/Product');
const Design = require('../models/Design');

const obtenerCatalogo = async (req, res) => {
  try {
    const productos = await Product.find();
    const disenos = await Design.find().populate('creador', 'nombre');

    const productosFormateados = productos.map(p => ({
      _id: p._id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      imagen: p.imagen,
      tipo: 'producto'
    }));

    const disenosFormateados = disenos.map(d => ({
      _id: d._id,
      nombre: d.nombre,
      descripcion: d.descripcion,
      precio: d.precio,
      imagen: d.imagen,
      tipo: 'diseño',
      creador: d.creador?.nombre || 'Anónimo'
    }));

    res.json([...productosFormateados, ...disenosFormateados]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el catálogo' });
  }
};

module.exports = { obtenerCatalogo };
