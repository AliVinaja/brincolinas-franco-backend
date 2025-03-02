const express = require('express');
const router = express.Router();
const { Categoria } = require('../models');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Buscando todas las categorías...');
    const categorias = await Categoria.findAll();
    console.log(`✅ Se encontraron ${categorias.length} categorías`);
    res.json(categorias);
  } catch (error) {
    console.error('❌ Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
});

module.exports = router;
