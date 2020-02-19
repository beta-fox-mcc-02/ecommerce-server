'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model{
    static associate(models){
      
    }
  }
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "This fill is requirement!"
        }
      }
    },
    image_url: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "This fill is requirement!"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "This fill is requirement!"
        }
      }
    },
    stock:  {
      type : DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "This fill is requirement!"
        }
      }
    },
    RoleId:  {
      type : DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "This fill is requirement!"
        }
      }
    }
  }, 
  {
    sequelize
  })

  return Product;
};