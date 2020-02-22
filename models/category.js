'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model 

  class Category extends Model {
    static associate (models) {

    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          args : true,
          msg : "category name cant be null"
        },
        notEmpty : {
          args : true,
          msg : "category name cant be empty"
        }
      }
    }
  }, {
    sequelize
  })
  return Category;
};