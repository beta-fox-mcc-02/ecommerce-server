'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.belongsTo(models.User)
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Name cannot null' },
        notEmpty: { args: true, msg: 'Name cannot empty' },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Image URL cannot null' },
        notEmpty: { args: true, msg: 'Image URL cannot empty' },
        isUrl: { args: true, msg: 'Invalid image url' }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Price cannot null' },
        notEmpty: { args: true, msg: 'Price cannot empty' },
        isFloat: { args: true, msg: 'Price should float type' }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Stock cannot null' },
        notEmpty: { args: true, msg: 'Stock cannot empty' },
        isInt: { args: true, msg: 'Stock should be an integer type' },
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'UserId cannot null' },
        notEmpty: { args: true, msg: 'UserId cannot empty' },
        isInt: { args: true, msg: 'UserId should be an integer type' }
      }
    }
  }, {
    sequelize
  })


  return Product;
};