'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [{
    username: 'admin',
    email: 'admin@mail.com',
    password: `${hashPassword('12345')}`,
    role: true,
    createdAt: 'NOW()',
    updatedAt: 'NOW()'
  },{
    username: 'user',
    email: 'user@mail.com',
    password: `${hashPassword('12345')}`,
    role: false,
    createdAt: 'NOW()',
    updatedAt: 'NOW()'
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
