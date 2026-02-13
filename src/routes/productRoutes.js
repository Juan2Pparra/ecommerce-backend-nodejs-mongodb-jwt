const express = require('express');
const router = express.Router();
const { obtenerCatalogo } = require('../controllers/productController');

router.get('/', obtenerCatalogo);

module.exports = router;
