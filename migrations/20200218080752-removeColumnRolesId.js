'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'RolesId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'RolesId', Sequelize.INTEGER);
  }
};
