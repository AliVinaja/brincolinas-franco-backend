const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeApp } = require('firebase-admin/app');
const limiter = require('./middlewares/rateLimiter');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Aplicar rate limiting a todas las rutas
app.use('/api', limiter);

// Inicializar Firebase Admin
const firebaseAdmin = initializeApp({
  credential: require(process.env.FIREBASE_ADMIN_KEY_PATH),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Rutas
app.use('/api/auth', authRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Algo salió mal!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
