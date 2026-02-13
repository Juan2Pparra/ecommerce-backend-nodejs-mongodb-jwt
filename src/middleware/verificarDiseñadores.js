const verificarDiseñador = (req, res, next) => {
  if (req.user.rol !== 'diseñador') {
    return res.status(403).json({ message: 'Acceso solo para diseñadores' });
  }
  next();
};

module.exports = verificarDiseñador;
