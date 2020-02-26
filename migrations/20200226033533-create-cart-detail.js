'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CartDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cart_id: {
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CartDetails');
  }
};