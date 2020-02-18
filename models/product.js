'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {
    static associate (models) {
      Product.belongsToMany(models.User, {
        through: models.Cart
      })
      Product.belongsToMany(models.Category, {
        through: models.CategoryProduct
      })
    }
  }

  Product.init({
    name: DataTypes.STRING,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: 'link format invalid'
        }
      }
    },
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    validate: {
      name_cant_null() {
        if (this.name === null || this.name === undefined || this.name.length === 0) {
          throw new Error ('required name')
        }
      },
      image_url_cant_null () {
        if (this.image_url === null || this.image_url === undefined || this.image_url.length === 0) {
          throw new Error ('required iamge_url')
        }
      },
      price_cant_null () {
        if (this.price === null || this.price === undefined) {
          throw new Error ('required price')
        }
      },
      stock_cant_null () {
        if (this.stock === null || this.stock === undefined) {
          throw new Error ('required stock')
        }
      },
      price_not_negative() {
        if (this.price < 0) {
          throw new Error ('price cant negative value')
        }
      },
      stock_not_negative() {
        if (this.stock < 0) {
          throw new Error ('stock cant negative value')
        }
      }
    }
  })

  return Product;
};