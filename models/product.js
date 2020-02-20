'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: models.CategoryProduct
      })
      Product.belongsToMany(models.User, {
        through: models.Cart
      })
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required product name'
        },
        notEmpty: {
          args: true,
          msg: 'required product name'
        },
        updateEmptyName (value) {
          if(!value) {
            throw new Error('required product name')
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required price tag'
        },
        isPositive(value) {
          if(value < 0) {
            throw new Error('Minimum price is 0')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true, 
          msg: 'No decimal stock'
        },
        isPositive(value) {
          if(value < 0) {
            throw new Error('Minimum stock is 0')
          }
        }
      }
    }
  }, {
    sequelize
  })
  
  return Product;
};