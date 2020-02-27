'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'Products', 'CategoryId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 'CategoryId', Sequelize.INTEGER);
  }
};
