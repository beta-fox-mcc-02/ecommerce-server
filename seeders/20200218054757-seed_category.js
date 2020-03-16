'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Categories', [{
      tag: `cloth`
    },
    {
      tag: `accessories`
    },
    {
      tag: `pants`
    },
    {
      tag: `jacket`
    },
    {
      tag: `suits`
    },
    {
      tag: `dress`
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
