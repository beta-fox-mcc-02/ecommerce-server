'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class ProductImage extends Model {
    static associate (models) {
      ProductImage.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
  }
  ProductImage.init({
    url: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Link url is required'
        },
        notEmpty: {
          args: true,
          msg: 'Link url is required'
        },
      }
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title is required'
        },
        notEmpty: {
          args: true,
          msg: 'Title is required'
        },
      }
    },
    product_id: DataTypes.INTEGER,
    delete_hash: DataTypes.TEXT
  }, { sequelize })
  return ProductImage;
};