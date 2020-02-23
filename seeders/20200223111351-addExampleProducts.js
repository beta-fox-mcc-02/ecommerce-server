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
      name: 'Los Angeles Dodgers League Essential 9Forty Black Adjustable',
      image_url: "https://az1.hatstoremedia.com/hatstore/images/885430014106_1/652/522/0/los-angeles-dodgers-league-essential-9forty-black-adjustable-new-era.jpg",
      stock: 50,
      price: 99000
    },
    {
      name: 'New York Yankees League Essential 59Fifty Maroon/White Fitted',
      image_url: "https://az1.hatstoremedia.com/hatstore/images/885430014106_1/652/522/0/los-angeles-dodgers-league-essential-9forty-black-adjustable-new-era.jpg",
      stock: 115,
      price: 129000
    },
    {
      name: 'Moose Orange Flexfit',
      image_url: "https://az1.hatstoremedia.com/hatstore/images/ob1000952-1_1/652/522/0/moose-orange-flexfit-hunter.jpg",
      stock: 148,
      price: 135000
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
