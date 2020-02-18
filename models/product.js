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
        notNull: {
          args: true,
          msg: 'name sould not be empty'
        }
      }
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
          msg: 'price sould not be empty'
        },
        min: {
          args: [0],
          msg: 'only allow value price higher than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'stock sould not be empty'
        },
        min: {
          args: [0],
          msg: 'only alow value stock higher than 0'
        }
      }
    }
  }, {sequelize})
  
  return Product;
};