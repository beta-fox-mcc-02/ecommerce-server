'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let categoryProductData = [
      {
        CategoryId: 1,
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 4,
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 6,
        ProductId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 8,
        ProductId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 3,
        ProductId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 4,
        ProductId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 5,
        ProductId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 5,
        ProductId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 6,
        ProductId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 8,
        ProductId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 7,
        ProductId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 7,
        ProductId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 8,
        ProductId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('CategoryProducts', categoryProductData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CategoryProducts', null);
  }
};
