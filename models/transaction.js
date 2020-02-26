'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    purchasePrice: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};