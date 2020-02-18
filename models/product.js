'use strict';

module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {
    static associate(models) {

    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1],
          msg: 'name cant be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1],
          msg: 'image url cant be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'price cant be less than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'stock cant be less than 0'
        }
      }
    }
  }, {
    sequelize
  })
  return Product;
};