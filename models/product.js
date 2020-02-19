'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id' })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        isGreaterThanZero(value) {
          if (!value) {
            throw new Error('Price has to be greater than zero')
          } else {
            if (value < 0) {
              throw new Error('Price has to be greater than zero')
            }
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Stock is required'
        },
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        isGreaterThanZero(value) {
          if (value < 0) {
            throw new Error('Stock minimal zero')
          }
        }
      }
    },
    category_id: {
      type: DataTypes.INTEGER
    }
  }, { sequelize })
  return Product;
};