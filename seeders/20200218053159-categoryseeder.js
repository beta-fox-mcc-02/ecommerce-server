'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Categories', [
    {
    name: 'jersey',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
      name: 'glove',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'boot',
      createdAt: new Date(),
      updatedAt: new Date()
    }
]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
