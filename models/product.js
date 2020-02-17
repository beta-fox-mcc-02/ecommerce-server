'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model{
    static associate(models){
      Product.belongsTo(models.User)
    }
  }

  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args: true,
          msg : 'name cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'name cannot be empty'
        } 
      } 
    },
    image_url: {
      type: DataTypes.STRING, 
      validate: {
        isUrl: {
          args: true,
          msg: 'invalid url'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        customValidator(value){
          if (value<0){
            throw new Error('price cannot be negative')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        customValidator(value){
          if (value<0){
            throw new Error('stock cannot be negative')
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  })

  return Product;
};