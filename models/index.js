const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'brincolinas_franco',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Activamos logging para debug
    dialectOptions: {
      charset: 'utf8mb4'
    }
  }
);

// Importar modelos
const CategoriaModel = require('./Categoria');
const ProductoModel = require('./Producto');

// Inicializar modelos
const Categoria = CategoriaModel(sequelize);
const Producto = ProductoModel(sequelize);

// Definir asociaciones
Producto.belongsTo(Categoria, {
  foreignKey: 'categoria_id', // Cambiado para coincidir con la BD
  as: 'categoria'
});

Categoria.hasMany(Producto, {
  foreignKey: 'categoria_id', // Cambiado para coincidir con la BD
  as: 'productos'
});

// Exportar todo
module.exports = {
  sequelize,
  Categoria,
  Producto
};
