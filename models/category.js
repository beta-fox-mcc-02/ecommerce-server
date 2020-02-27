'use strict';
module.exports = (sequelize, DataTypes) => {
  class category extends sequelize.Sequelize.Model{
    static associate (models){
    }
  }
  category.init({
    name: {
      type: DataTypes.STRING
    }
  },{sequelize})
  // const category = sequelize.define('category', {
  //   name: DataTypes.STRING
  // }, {});
  // category.associate = function(models) {
  //   // associations can be defined here
  // };
  return category;
};