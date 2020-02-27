'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Carts', null, {});
  }
};
