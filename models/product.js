'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.belongsToMany(models.User, {through: models.Cart})
      // Product.belongsToMany(models.Category, {through: models.ProductCategory})
      Product.belongsTo(models.Category)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `name can't be null`
        },
        notEmpty: {
          args: true,
          msg: `Name must be filled`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaaLnanBIRR-u46gnKzJXcwbLRqSdm6qZU5MBXhI--sFF62Qpp`
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `name can't be null`
        },
        notEmpty: {
          args: true,
          msg: `Name must be filled`
        },
        min: {
          args: 0,
          msg: `price cannot be bellow 0`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `name can't be null`
        },
        notEmpty: {
          args: true,
          msg: `Name must be filled`
        },
        min: {
          args: 0,
          msg: `price cannot be bellow 0`
        }
      }
    }
  }, {
    sequelize
  });
  return Product;
};