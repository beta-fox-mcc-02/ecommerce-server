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
        name: 'HP',
        image_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.explicit.bing.net%2Fth%3Fid%3DOIP.v5TgtiXEUe_ayOilyKoM0AHaEK%26pid%3DApi&f=1',
        price: 3000000,
        stock: '50',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asus',
        image_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.thewirecutter.com%2Fwp-content%2Fuploads%2F2018%2F07%2Flaptops-under-500-lowres-9990.jpg&f=1&nofb=1',
        price: 3500000,
        stock: '30',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lenovo',
        image_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.windowscentral.com%2Fsites%2Fwpcentral.com%2Ffiles%2Fstyles%2Flarge%2Fpublic%2Ffield%2Fimage%2F2017%2F09%2Fthinkpad-p71-1.jpg%3Fitok%3De8kMNRbf&f=1&nofb=1',
        price: 5000000,
        stock: '35',
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
