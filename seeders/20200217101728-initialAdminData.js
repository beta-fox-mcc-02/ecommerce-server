'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let adminData = [
      {
        name: 'Gaga',
        email: 'gaga@gmail.com',
        password: '$2a$10$CDWe5mtyRPs/XF9MhoQ54ua7kyskz57ody.jS87n.cj/MR9H/DiV2',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Users', adminData)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null)
  }
};
