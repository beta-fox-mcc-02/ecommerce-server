'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Cart, {through: models.CartProduct})
    }
  }

  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Product name is required"
        }
      }
    }, 
    image_url: {
      type : DataTypes.STRING,
    }, 
    price: {
      type : DataTypes.REAL,
      validate : {
        minimal(value, next) {
          if (value >= 0) {
            next()
          } else {
            next("price below the minimal value")
          }
        }
      }
    }, 
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        minimal(value, next) {
          if (value >= 0) {
            next()
          } else {
            next("stock below the minimal value")
          }
        }
      }
    } 
  }, {
    sequelize
  })
  
  return Product;
};