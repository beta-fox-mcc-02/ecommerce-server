'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {args: true, msg: 'Product name cannot be empty'}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {args: true, msg: 'Invalid URL format (http://foo.com)'}
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {args: true, msg: 'Price cannot be empty'},
        min: {args: '0', msg: 'Price should be greater than 0'}
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {args: true, msg: 'Stock cannot be empty'},
        min: {args: '0', msg: 'Stock should be greater than 0'}
      }
    }
  }, {
    sequelize,
    hooks: {

    }
  })
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, {
      through: models.Transaction,
      foreignKey: 'ProductId',
      otherKey: 'UserId'
    })

    Product.hasMany(models.Transaction, { foreignKey: 'id' })
  };
  return Product;
};