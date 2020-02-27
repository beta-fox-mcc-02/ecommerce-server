'use strict';
module.exports = (sequelize, DataTypes) => {
  class History extends sequelize.Sequelize.Model{}
  History.init({
    CartId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    invoice: DataTypes.DATE
  }, {
    sequelize
  });
  History.associate = function(models) {
    // associations can be defined here
    History.belongsTo(models.Cart)
  };
  return History;
};