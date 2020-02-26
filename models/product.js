'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {
    static associate (models) {
      Product.hasMany(models.CartDetail)
      Product.belongsTo(models.Category)
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'product name cant be empty'
        },
        notNull : {
          args : true,
          msg : 'product name cant be null'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING //,
      // validate : {
      //   isUrl : {
      //     args : true,
      //     msg : 'url format wrong'
      //   }
      // }
    },
    price: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty : {
          args : true,
          msg : 'price cant be empty'
        },
        isInt : {
          args : true,
          msg : 'price must contain number'
        },
        min : {
          args : '0',
          msg : 'price cant be lower than zero'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty : {
          args : true,
          msg : 'stock cant be empty'
        },
        isNumeric : {
          args : true,
          msg : 'stock must contain number only'
        },
        min : {
          args : '0',
          msg : 'stock cant be lower than zero'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate : {
        isAlpha : {
          args : true,
          msg : 'genre must contain character only'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate : {
        isNumeric : {
          args : true,
          msg : 'category id must contain number only'
        }
      }
    }
  }, {
    sequelize
  })


  return Product;
};