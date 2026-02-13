const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const verifyToken = require('../middleware/verifyToken');
const verificarDiseñador = require('../middleware/verificarDiseñadores');
const { publicarDiseno } = require('../controllers/designController');

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + path.extname(file.originalname);
    cb(null, nombreUnico);
  }
});

const upload = multer({ storage });

router.post(
  '/publicar',
  verifyToken,
  verificarDiseñador,
  upload.single('imagen'),
  publicarDiseno
);

module.exports = router;
