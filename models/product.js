'use strict';
module.exports = (sequelize, DataTypes) => {
  const {
    Model
  } = require('sequelize')

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Name cannot be empty'
        }
      },
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        notNull: {
          args: true,
          msg: 'Price cannot be empty or null'
        },
        min: {
          args: '1',
          msg: 'price cannot be 0 or less than 0'
        }
      },
      allowNull: false
    },
    stocks: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        min: {
          args: '1',
          msg: 'stock cannot be 0 or less than 0'
        }
      },
      allowNull: false
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'Category cannot be empty'
        }
      },
      allowNull: false
    }
  }, {
    sequelize
  })

  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.Cart)
    Product.belongsTo(models.Category)
  };
  return Product;
};