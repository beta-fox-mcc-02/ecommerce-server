'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addConstraint('Products', ['category_id'], {
    type: 'foreign key',
    name: 'foreign_key_category',
    references: { //Required field
      table: 'Categories',
      field: 'id'
    },
    onDelete: 'restrict',
    onUpdate: 'restrict'
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeConstraint('Products','foreign_key_category')
  }
};
