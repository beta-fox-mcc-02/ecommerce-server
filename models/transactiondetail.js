'use strict'
module.exports = (sequelize, DataTypes) => {
  const TransactionDetail = sequelize.define(
    'TransactionDetail',
    {
      TransactionId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      ProductId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      image_url: DataTypes.STRING
    },
    {}
  )
  TransactionDetail.associate = function(models) {
    // associations can be defined here
    TransactionDetail.belongsTo(models.Transaction)
  }
  return TransactionDetail
}
