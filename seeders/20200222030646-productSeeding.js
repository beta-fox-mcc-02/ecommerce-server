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
        name: 'Bonavita - Digital Coffee Brewer',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/573d90fac4633_600x.jpg?v=1490263063',
        price: 12000000,
        stock: '50',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Breville - The Oracle Espresso BES980',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/5897e377606c4_1500x.jpg?v=1490263450',
        price: 13000000,
        stock: '30',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Getra Coffee Machine L Anna-1GR',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/572338e016185_1500x.jpg?v=1490263006',
        price: 22000000,
        stock: '35',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Breville Coffee Machine Dual Boiler BES920',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/5649a570aa63d_1500x.jpg?v=1490263512',
        price: 11000000,
        stock: '20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chemex - Ottomatic Coffee Maker',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/589d250a80b4a_1500x.jpg?v=1490263606',
        price: 7000000,
        stock: '35',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coffee Grinder with Glass Base',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/5879b76ec4e4f_1500x.jpg?v=1490263433',
        price: 3000000,
        stock: '30',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delonghi Dedica EC 680.R',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/5811aae89c54b_1500x.jpg?v=1490263490',
        price: 5000000,
        stock: '15',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Getra Pro Commercial Blender KS-10000',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/572460d1d93f3_1500x.jpg?v=1490263035',
        price: 6000000,
        stock: '40',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delonghi EC 860.M',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/2288_1500x.jpg?v=1490263254',
        price: 12000000,
        stock: '8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delonghi ICM 14011',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/2292_1500x.jpg?v=1490262410',
        price: 8000000,
        stock: '25',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delonghi Icona ECO 310.B',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/589d855973a93_1500x.jpg?v=1490262711',
        price: 5000000,
        stock: '35',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delonghi Icona ECO 310.W',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/2565_1500x.jpg?v=1490263497',
        price: 5000000,
        stock: '35',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delonghi Icona Vintage ECOV 310.AZ',
        image_url: 'https://cdn.shopify.com/s/files/1/1776/2069/products/2568_1500x.jpg?v=1490263287',
        price: 5000000,
        stock: '10',
        createdAt: new Date(),
        updatedAt: new Date()
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
