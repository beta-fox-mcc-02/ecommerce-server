'use strict';

module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
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
    }
  }, {
    sequelize
  })
  Product.associate = function(models) {
    Product.belongsTo(models.Category)
  };
  return Product;
};