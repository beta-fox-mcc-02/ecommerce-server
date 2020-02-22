'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Categories', [
        {
          name: 'Original',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Replica',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'PG',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'MG',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'HG',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
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
