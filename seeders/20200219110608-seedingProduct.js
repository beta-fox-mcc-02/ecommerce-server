'use strict';
const products = [
  {
    name : 'GN-0000+GNR-010 00 Raiser (MG)',
    image_url : 'https://www.1999.co.jp/itbig14/10140958.jpg',
    price : 1000000,
    stock : 5,
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name : 'MG 1/100 ZGMF-X10A Freedom Gundam',
    image_url : 'https://s.blanja.com/picspace/113/139377/747.600_16d175ad949245c3b2f1e2be991e169a.JPG?w=700',
    price : 800000,
    stock : 10,
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name : 'ZGMF-X20A Strike Freedom',
    image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/3/19/4908894/4908894_b2a969fb-ef33-401b-b787-0c9e0e4e48da.jpg',
    price : 1000000,
    stock : 4,
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name : 'Wing Gundam Proto Zero',
    image_url : 'https://media.karousell.com/media/photos/products/2018/03/09/gundam_wing_zero_proto_daban_1520560858_e98bee88.jpg',
    price : 500000,
    stock : 2,
    createdAt : new Date(),
    updatedAt : new Date()
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Products', null, {});
  }
};
