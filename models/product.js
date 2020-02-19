'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {
    static associate(models) {
      // associations can be defined here
    };
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Product name is required'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Price must be an integer"
        },
        notNull: {
          args: true,
          msg: "Price is required"
        },
        minimumValue(value, next) {
          if(value >= 0) {
            next()
          }
          else {
            next('Price cannot be less than 0')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Stock must be an integer"
        },
        notNull: {
          args: true,
          msg: "Stock is required"
        },
        minimumValue(value, next) {
          if(value >= 0) {
            next()
          }
          else {
            next('Stock cannot be less than 0')
          }
        }
      }
    }
  },
  {
    sequelize
  })

  return Product;
};