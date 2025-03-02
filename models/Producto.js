const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Producto = sequelize.define('Producto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER
    },
    imagenes: {
      type: DataTypes.JSON
    },
    dimensiones: {
      type: DataTypes.JSON
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    categoria_id: {  
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categorias',
        key: 'id'
      }
    }
  }, {
    tableName: 'productos',
    timestamps: false
  });

  return Producto;
};
