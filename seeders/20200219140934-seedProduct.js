'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Products', [
      {
        "name": "Doraemon vol.1",
        "image_url": "https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg",
        "price": 15000,
        "stock": 10,
        "author": "fujiko f fujio",
        "createdAt": "NOW()",
        "updatedAt": "NOW()"
      },
      {
        "name": "Laskar Pelangi",
        "image_url": "https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/220px-Laskar_pelangi_sampul.jpg",
        "price": 70000,
        "stock": 20,
        "author": "Andrea Hirata",
        "createdAt": "NOW()",
        "updatedAt": "NOW()"
      },
      {
        "name": "Sang Pemimpi",
        "image_url": "https://upload.wikimedia.org/wikipedia/id/8/89/Sang_Pemimpi_sampul.jpg",
        "price": 80000,
        "stock": 5,
        "author": "Andrea Hirata",
        "createdAt": "NOW()",
        "updatedAt": "NOW()"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
