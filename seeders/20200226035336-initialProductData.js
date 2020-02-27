'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let shoesData = [
      {
        name: 'Nike Stylish 6',
        description: 'Stylish shoes for many activities',
        image_url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 486000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Luxberry Heels',
        description: 'Glamour heels for showing beautiful persona',
        image_url: 'https://images.pexels.com/photos/949590/pexels-photo-949590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 689000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Converse 101',
        description: "Everyone's common shoes, affordable and still trendy",
        image_url: 'https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?cs=srgb&dl=pair-of-laced-up-black-low-top-sneakers-847371.jpg&fm=jpg',
        price: 120000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vans Fontro',
        description: "Simple yet trendy sneaker for every generation",
        image_url: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 200000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike + Air Jordan Limited Edition',
        description: "Limited Edition for Basketball player or enthusiasts",
        image_url: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 1300000,
        stock: 50,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adidas Autumn Style',
        description: "Exclusive Adidas shoes for Autumn season",
        image_url: 'https://images.pexels.com/photos/1599005/pexels-photo-1599005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 340000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Red High Heels',
        description: "Elegant color for exotic women",
        image_url: 'https://images.pexels.com/photos/3682292/pexels-photo-3682292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 980000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hills Power Boots',
        description: "Durable boots for travel and adventure",
        image_url: 'https://images.pexels.com/photos/167706/pexels-photo-167706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 800000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cresent Black Boots',
        description: "Exotic boots for traveller, especially for women",
        image_url: 'https://images.pexels.com/photos/1501210/pexels-photo-1501210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 1500000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Crocodile Black',
        description: "Formal men shoes, exotic and elegeant",
        image_url: 'https://images.pexels.com/photos/296158/pexels-photo-296158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 1320000,
        stock: 100,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Products', shoesData)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null)
  }
};
