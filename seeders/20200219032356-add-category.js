'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: 'Jersey',
    }, {
      name: 'Boots'
    }, {
      name: 'Football'
    }, {
      name: 'Badminton'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
