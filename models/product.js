'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        args : true,
        msg : 'name cannot empty'
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type : DataTypes.FLOAT,
      validate : {
        min : {
          args : 0,
          msg : 'price must greater than 0'
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : 0,
          msg : 'stock must greater than 0'
        }
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate : (product, options) => {
        if(!image_url){
          image_url = 'https://cdn.dribbble.com/users/2022451/screenshots/5557745/empty_bag.gif'
        }
      }
    }
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};