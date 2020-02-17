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
        min: {
          args: 0,
          msg: 'Minimum price is 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'Minimun stock input is 0'
        },
        isInt: {
          args: true, 
          msg: 'No decimal stock'
        }
      }
    }
  }, {
    sequelize
  })
  
  return Product;
};