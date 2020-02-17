'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Product extends Model {
    static associate(models) {
      // associations can be defined here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValid(value, next) {
          if (!value) {
            next('Name is Required');
          } else {
            next();
          }
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isPositive(value, next) {
          if (value < 0) {
            next(`Price can't be Negative Number`);
          } else {
            next();
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInStock(value, next) {
          if (value <= 0) {
            next(`You should have the item in stock!`);
          } else {
            next();
          }
        }
      }
    }
  }, { sequelize });
  return Product;
};