'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Products', [
      {
        name: `gnn formal navy suit`,
        image_url: `https://storage.googleapis.com/chibi-store-storage/15824533958922.png`,
        price: 900000,
        stock: 4,
        CategoryId: 5
      },
      {
        name: `joy division official merch`,
        image_url: `https://storage.googleapis.com/chibi-store-storage/15824535306114.png`,
        price: 200000,
        stock: 3,
        CategoryId: 1
      },
      {
        name: `casual gnn coat`,
        image_url: `https://storage.googleapis.com/chibi-store-storage/158245399559611.png`,
        price: 400000,
        stock: 5,
        CategoryId: 4
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('People', null, {});
  }
};
