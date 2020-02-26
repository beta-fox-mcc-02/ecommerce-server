'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.hasMany(models.Cart);
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Name Cannot Null' },
        notEmpty: { args: true, msg: 'Name Cannot Empty' },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Image URL Cannot Null' },
        isUrl: { args: true, msg: 'Invalid Image URL' }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Price Cannot Null' },
        min: { args: '0', msg: 'Price Cannot Negative' }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Stock Cannot Null' },
        min: { args: '0', msg: 'Stock Cannot Negative' }
      }
    }
  }, {
    sequelize
  });


  return Product;
};