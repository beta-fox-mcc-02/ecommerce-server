'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts', 'status', Sequelize.BOOLEAN)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Carts', 'status')
  }
};
