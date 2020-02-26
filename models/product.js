'use strict';
const { beforeCreate, afterFind } = require('../helpers/hookshelpers.js')

module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `name cannot be empty`
        }
      }
    },
    imageUrl: { 
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: 'image url expected to be webformat'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        price(value) {
          if(value <= 0) throw new Error(`Price cant be negative`)
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        stock(value) {
          if(value <= 0) throw new Error(`Stock cant be negative`)
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: { beforeCreate, afterFind }
  })
  Product.associate = function(models) {
    Product.belongsTo(models.Category)
    Product.belongsToMany(models.Customer, { through: models.Transaction })
  };
  return Product;
};