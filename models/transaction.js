'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    purchasePrice: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Customer)
    Transaction.belongsTo(models.Product)
  };
  return Transaction;
};