'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

     let roles = [
       {
         position: 'Admin'
       },
       {
         position: 'Costumer'
       }
     ]
      return queryInterface.bulkInsert('Roles', roles, {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Roles', null, {});
    }
};
