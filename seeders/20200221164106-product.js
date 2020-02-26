'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  let data = [
    {
      name: 'Vacation Batman',
      image_url: "https://images.unsplash.com/photo-1538448174498-9956c159edb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      price: 200000,
      stock: 20
    },
    {
      name: 'Stormtrooper',
      image_url: "https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
      price: 200000,
      stock: 5
    },
    {
      name: 'Benny',
      image_url: "https://images.unsplash.com/photo-1560167016-022b78a0258e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80",
      price: 100000,
      stock: 0
    }
  ]
  return queryInterface.bulkInsert('Products', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
