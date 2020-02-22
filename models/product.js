'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{
    static associate(models){

    }
  }
  Product.init({
    name : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          arg : true,
          msg : 'please insert title'
        },
        min(value){
          if(value.length < 0 || value == undefined){
            throw new Error('Error')
          }
        }
      }
    },
    description : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          arg : true,
          msg : 'please insert descriptions'
        }
      }
    },
    image_url : {
      type : DataTypes.STRING
    },
    stock : {
      type : DataTypes.INTEGER,
      validate : {
        min(value){
          if(value < 0){
            throw new Error('out of stock')
          }
        }
      }
    },
    price : {
      type : DataTypes.FLOAT,
      validate : {
        min(value){
          if(value < 0){
            throw new Error('Please insert valid price')
          }
        }
      }
    },
    CategoryId : {
      type : DataTypes.INTEGER
    }
  },{sequelize})
  // const Product = sequelize.define('Product', {
  //   name: DataTypes.STRING,
  //   description: DataTypes.STRING,
  //   image_url: DataTypes.STRING,
  //   stock: DataTypes.INTEGER,
  //   CategoryId: DataTypes.INTEGER,
  //   price: DataTypes.FLOAT
  // }, {});
  // Product.associate = function(models) {
  //   // associations can be defined here
  // };
  return Product;
};