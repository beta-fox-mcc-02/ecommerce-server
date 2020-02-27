'use strict';

module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.hasMany(models.Cart)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1],
          msg: 'name cant be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1],
          msg: 'image url cant be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'price cant be less than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'stock cant be less than 0'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1],
          msg: 'author Name cant be empty'
        }
      }
    }
  }, {
    sequelize
  })
  return Product;
};