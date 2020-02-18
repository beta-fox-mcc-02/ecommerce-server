'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {
    static associate(models) {
      //association can be found here
      Product.belongsTo(models.Category)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product name cannot empty"
        },
        isEmpty: {
          msg: "Product name cannot empty"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product price cannot null"
        }
      }
    },
    stock: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product stock cannot null"
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {sequelize});

  return Product;
};