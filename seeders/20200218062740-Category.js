'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Fashions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Foods',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Utilities',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
