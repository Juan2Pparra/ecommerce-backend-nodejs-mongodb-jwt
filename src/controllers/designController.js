const Product = require('../models/Product');

const publicarDiseno = async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagen = req.file?.filename;

  try {
    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      imagen,
      tipo: 'diseno',
      creador: req.user.id
    });

    await nuevoProducto.save();

    res.status(201).json({
      ok: true,
      message: 'Diseño publicado correctamente'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al publicar diseño' });
  }
};

module.exports = { publicarDiseno };
