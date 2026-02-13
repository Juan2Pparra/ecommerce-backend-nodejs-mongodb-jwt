const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const conectarDB = require('./src/config/db');

// Rutas
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const designRoutes = require('./src/routes/designRoutes');

dotenv.config();
conectarDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Carpeta pública (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Carpeta de imágenes subidas por diseñadores
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas API
app.use('/api', authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/carrito', cartRoutes);
app.use('/api/disenos', designRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
