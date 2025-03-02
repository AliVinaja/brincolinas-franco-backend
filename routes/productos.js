const express = require('express');
const router = express.Router();
const { Categoria, Producto } = require('../models');
const { Op } = require('sequelize');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Buscando todos los productos...');
    
    const productos = await Producto.findAll({
      include: [{ 
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre']
      }]
    });
    
    // Asegurarnos de que los campos JSON estén parseados
    const productosFormateados = productos.map(producto => {
      const prod = producto.toJSON();
      try {
        // Parsear imagenes si es un string
        if (typeof prod.imagenes === 'string') {
          prod.imagenes = JSON.parse(prod.imagenes);
        }
        // Parsear dimensiones si es un string
        if (typeof prod.dimensiones === 'string') {
          prod.dimensiones = JSON.parse(prod.dimensiones);
        }
      } catch (error) {
        console.error('Error al parsear JSON:', error);
      }
      return prod;
    });

    console.log(`✅ Se encontraron ${productos.length} productos`);
    res.json(productosFormateados);
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  try {
    console.log(`🔍 Buscando producto con ID ${id}...`);
    const producto = await Producto.findByPk(id, {
      include: [{ 
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre']
      }]
    });
    
    if (!producto) {
      console.log(`❌ No se encontró el producto con ID ${id}`);
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Formatear el producto
    const productoFormateado = producto.toJSON();
    try {
      // Parsear imagenes si es un string
      if (typeof productoFormateado.imagenes === 'string') {
        productoFormateado.imagenes = JSON.parse(productoFormateado.imagenes);
      }
      // Parsear dimensiones si es un string
      if (typeof productoFormateado.dimensiones === 'string') {
        productoFormateado.dimensiones = JSON.parse(productoFormateado.dimensiones);
      }
    } catch (error) {
      console.error('Error al parsear JSON:', error);
    }

    console.log('✅ Producto encontrado:', producto.nombre);
    res.json(productoFormateado);
  } catch (error) {
    console.error('❌ Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
});

module.exports = router;
