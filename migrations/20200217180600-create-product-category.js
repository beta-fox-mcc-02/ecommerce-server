'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER
      },
      CategoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        dafaultValue: new Date ()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        dafaultValue: new Date ()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductCategories');
  }
};