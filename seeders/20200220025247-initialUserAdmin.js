'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [ { email: 'Admin', password: '$2a$10$DM.5BT0ksUkUOylFIx7ymuvIDoDGxHzZ9O0u2gzY08.zwPAFaQrqK', RoleId: 1 } ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
