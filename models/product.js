'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Product extends Model{}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert the product name'
        },
        len: {
          args: [3],
          msg: 'Product name minimal 3 characters'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert the image url'
        },
        isUrl: {
          args: true,
          msg: 'Please insert the URL address'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert the price'
        },
        min: {
          args: 1,
          msg: 'Price minimal 1'
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please insert the stock'
          },
          min: {
            args: 0,
            msg: 'Stock minimal 0'
          }
        }
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please insert the category'
          },
          min: {
            args: 1,
            msg: 'Category Id minimal 1'
          }
        }
      }
    }
  }, {
    sequelize
  })

  
  Product.associate = function(models) {
  };
  return Product;
};