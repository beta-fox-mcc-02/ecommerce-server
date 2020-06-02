'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'name cannot empty'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type : DataTypes.FLOAT,
      validate : {
        isPositive : (value, next) =>{
          if (value >= 0) next()
          else next('price must positive number')
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        isPositive : (value, next) =>{
          if (value >= 0) next()
          else next('stock must positive number')
        }
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeBulkUpdate : (product, options) => {
        // console.log(product)
        if(product.attributes.image_url === ''){
          product.image_url = 'https://cdn.dribbble.com/users/2022451/screenshots/5557745/empty_bag.gif'
        }
      },
      beforeCreate : (product, options) => {
        if(product.image_url === ''){
          product.image_url = 'https://cdn.dribbble.com/users/2022451/screenshots/5557745/empty_bag.gif'
        }
      }
    }
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.Category, {through: models.CategoryProduct})
    Product.belongsToMany(models.Cart, {through: models.CartProduct})
  };
  return Product;
};