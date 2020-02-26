'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id' })
      Product.hasMany(models.ProductImage, { foreignKey: 'product_id' })
      Product.hasMany(models.CartDetail, { foreignKey: 'product_id'} )
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
        isNumeric: {
          args: true,
          msg: 'Price only contains number'
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
        isNumeric: {
          args: true,
          msg: 'Stock only contains number'
        },
        isGreaterThanZero(value) {
          if (value < 0) {
            throw new Error('Stock minimal zero')
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Description is required'
        },
        notEmpty: {
          args: true,
          msg: 'Description is required'
        }
      }
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Weight is required'
        },
        notEmpty: {
          args: true,
          msg: 'Weight is required'
        },
      }
    },
    SKU: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'SKU is required'
        },
        notEmpty: {
          args: true,
          msg: 'SKU is required'
        }
      }
    },
    category_id: {
      type: DataTypes.INTEGER
    }
  }, { sequelize })
  return Product;
};