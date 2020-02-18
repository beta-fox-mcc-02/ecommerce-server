'use strict';

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
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `image url cannot be empty`
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
    }
  }, {
    sequelize
  })
  Product.associate = function(models) {
    Product.belongsTo(models.Category)
  };
  return Product;
};