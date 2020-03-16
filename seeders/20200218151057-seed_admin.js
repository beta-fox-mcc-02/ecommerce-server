'use strict';
require('dotenv').config()
let bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("12345", salt)

    return queryInterface.bulkInsert('Users', [
      {
        name: `admin`,
        email: `admin@admin.com`,
        password: hash,
        isAdmin: true
      },
      {
        name: `dummy`,
        email: `dummy@dummy.com`,
        password: hash,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
