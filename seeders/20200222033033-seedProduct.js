'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let products = [
      {
        name: "I-watch 4",
        image_url: "https://images-na.ssl-images-amazon.com/images/I/41eJMQgmUrL.jpg",
        price: 4000000,
        stock: 25,
        createdAt: "now()",
        updatedAt: "now()"
      },
      {
        name: "samsung gear s4",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRSiV-tX3yvxZvJ3E8RJF1xpYyjYRyGakXdKD89VUHSpjKcBicx",
        price: 3500000,
        stock: 10,
        createdAt: "now()",
        updatedAt: "now()"
      },
      {
        name: "i-watch 3",
        image_url: "https://images-na.ssl-images-amazon.com/images/I/41eJMQgmUrL.jpg",
        price: 25000,
        stock: 10,
        createdAt: "now()",
        updatedAt: "now()"
      }
    ]
    return queryInterface.bulkInsert('Products', products, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
