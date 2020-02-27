'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', 'UserId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 'UserId', Sequelize.INTEGER);

  }
};
