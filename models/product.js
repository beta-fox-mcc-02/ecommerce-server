'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        args : true,
        msg : 'empty is not allowed'
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type : DataTypes.FLOAT,
      validate : {
        min : {
          args : 0,
          msg : 'can not input negative number'
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : 0,
          msg : 'can not input negative number'
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