'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let categoryData = [
      {
        name: 'men',
        bg_img: 'https://www.dolcegabbana.com/on/demandware.static/-/Library-Sites-Dolcegabbana/default/dw48846697/pageimages/PLPbanner/men-shoes-mob.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'women', 
        bg_img: 'https://images.pexels.com/photos/1308324/pexels-photo-1308324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',   
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'converse',
        bg_img: 'https://images.pexels.com/photos/1753082/pexels-photo-1753082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sneaker',
        bg_img: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sport',
        bg_img: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'heels',
        bg_img: 'https://images.pexels.com/photos/1507351/pexels-photo-1507351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'boots',
        bg_img: 'https://images.pexels.com/photos/1684076/pexels-photo-1684076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'formal',
        bg_img: 'https://images.pexels.com/photos/1566421/pexels-photo-1566421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
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
