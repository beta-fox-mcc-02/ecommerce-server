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
    name: 'Smartphone'
  }, 
  {
    name: 'Electric Car'
  },
  {
    name: 'Television and Monitor'
  },
  {
    name: 'Camera'
  },
  {
    name: 'Computer and Laptop'
  },
  {
    name: 'Miscellaneous'
  }
], {})
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
