'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('People', ['email'], {
      type: 'unique',
      name: 'custom_unique_constraint_name'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('People', 'custom_unique_constraint_name');
  }
};
