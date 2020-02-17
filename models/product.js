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
        isValid(value) {
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
        isPositive(value) {
          if (value < 0) {
            next(`Price Shouldn't Negative Number`);
          } else {
            next();
          }
        }
      }
    },
    stock: DataTypes.INTEGER
  }, { sequelize });
  return Product;
};