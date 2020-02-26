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
        "name": "Sweat A",
        "image_url": "https://www.bbo-store.com/wp-content/uploads/2019/02/1-29.jpg",
        "price": 200000,
        "stock": 10
    },
    {
        "name": "Sweat B",
        "image_url": "https://s.blanja.com/picspace/570/286266/800.800_a58fda2f71e14af7affe2a35d6b5b249.jpg?w=348",
        "price": 220000,
        "stock": 5
    },
    {
        "name": "Sweat C",
        "image_url": "https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp",
        "price": 190000,
        "stock": 7
    },
    {
        "name": "Sweat D",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpoyoBh37mh0QrGQFHqzPEPfB_wcBjwxa5cm1bDhbvCo6SzRnF",
        "price": 200000,
        "stock": 3
    },
    {
        "name": "Sweat E",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrATcSTZA29sMze4Hqwu4gjq8BPx2UscGQiA2SVkrbqtiwEqBD",
        "price": 150000,
        "stock": 4
    },
    {
        "name": "Sweat F",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCT4u6f-CPWcnzHGZSh4eyx8EsPtl6ueThRjVHhFuFN3JxQCYQ",
        "price": 180000,
        "stock": 5
    },
    {
        "name": "Sweat G",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgWssS6MVo62_QvO1WJ-6dG3iiYSqTSHQJKEHGbgZc2_S53PZl",
        "price": 300000,
        "stock": 11
    },
    {
        "name": "Sweat H",
        "image_url": "https://ae01.alicdn.com/kf/HTB1qzY2XdjvK1RjSspiq6AEqXXat/Machine-Gun-Kelly-2018-MGK-Rap-Setan-Musim-Gugur-Turtleneck-Sweatshirt-Wanita-Pria-Kebesaran-Fashion-Sweatshirt.jpg_q50.jpg",
        "price": 400000,
        "stock": 2
    }
  ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Products', null, {})
  }
};
