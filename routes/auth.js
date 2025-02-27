const express = require('express');
const router = express.Router();

// Ruta para obtener la configuración de Firebase
router.get('/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  });
});

// Ruta para obtener la API key de Google Maps
router.get('/maps-key', (req, res) => {
  res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
});

module.exports = router;
