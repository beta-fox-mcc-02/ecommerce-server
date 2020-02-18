'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let categoryData = [
      {
        name: 'men',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'women',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'converse',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sneaker',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'running',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'heels',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'high heels',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'boots',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'skate',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'formal',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Categories', categoryData)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null)
  }
};
