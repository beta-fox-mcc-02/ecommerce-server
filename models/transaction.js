'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Transaction extends Model {}

  Transaction.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    sum: { // maksudnya price
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    }
  }, {
    sequelize,
    hooks: {
      
    }
  })
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};