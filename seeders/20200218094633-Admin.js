'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', [
      {
        email: 'andi@bscomm.com',
        password: 12345,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'budi@bscomm.com',
        password: 12345,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
