const request = require('supertest');
const app = require('../app');
const { sequelize, Product, User } = require('../models');
const { createToken } = require('../helpers/jwt');

let AdminToken = '', CustomerToken = '', idProduct1 = 0, idProduct2 = 0;

describe('Product Routes', () => {
  // beforeEach
  beforeEach(done => {
    const products = [
      {
        name: 'Buku',
        image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
        price: 1500,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Baju',
        image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
        price: 1500.5,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    Product.bulkCreate(products)
      .then(res => {
        idProduct1 = res[0].id; idProduct2 = res[1].id;
        return User.create({
          email: 'mail@mail.com',
          password: '12345',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
      .then(res => {
        const payload = { id: res.id };
        AdminToken = createToken(payload);
        return User.create({
          email: 'customer@mail.com',
          password: '12345',
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date
        })
      })
      .then(res => {
        const payload = { id: res.id };
        CustomerToken = createToken(payload);
        done();
      })
      .catch(err => done(err))
  })

  // afterEach
  afterEach(done => {
    sequelize.queryInterface.bulkDelete('Products', {})
      .then(res => sequelize.queryInterface.bulkDelete('Users', {}))
      .then(res => done())
      .catch(err => done(err))
  })

  // ===========================
  // Create Product validation
  describe('Create Product', () => {
    // Success
    describe('Success Create Product', () => {
      test('Success Create Product', done => {
        request(app)
          .post('/products')
          .set('access_token', AdminToken)
          .send({
            name: 'Kaos Kaki',
            image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
            price: 50,
            stock: 5,
          })
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'Success Create Product')
            expect(res.status).toBe(201);
            done();
          })
      })
    })
    // Fail
    describe('Fail Create Product', () => {
      // User Authentication
      describe('User Authentication', () => {
        test('Wrong token user auth', done => {
          request(app)
            .post('/products')
            .set('access_token', 'wrong token')
            .send({
              name: 'Kaos Kaki',
              image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
              price: 50,
              stock: 5,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(401);
              expect(res.body).toHaveProperty('message', 'You Must Register First');
              done();
            })
        })
      })

      // name Validation
      describe('Name Validation', () => {
        // Not Null
        test('Validate null name', done => {
          request(app)
            .post('/products')
            .set('access_token', AdminToken)
            .send({
              name: null,
              image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
              price: 50,
              stock: 5,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', ['Name Cannot Null'])
              done();
            })
        })
        // Not Empty
        test('Validate empty name', done => {
          request(app)
            .post('/products')
            .set('access_token', AdminToken)
            .send({
              name: '',
              image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
              price: 50,
              stock: 5,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', ['Name Cannot Empty'])
              done();
            })
        })
      })
      // image_url Validation
      describe('Image Url Validation', () => {
        // Not Null
        test('Validate Null URL', done => {
          request(app)
            .post('/products')
            .set('access_token', AdminToken)
            .send({
              name: 'Kaos Kaki',
              image_url: null,
              price: 50,
              stock: 5,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', ['Image URL Cannot Null'])
              done();
            })
        })
        // Is URL?
        test('Validate valid URL', done => {
          request(app)
            .post('/products')
            .set('access_token', AdminToken)
            .send({
              name: 'Kaos Kaki',
              image_url: 'httpx://aksjdnaskjdnka',
              price: 50,
              stock: 5,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', ['Invalid Image URL'])
              done();
            })
        })
      })
      // price Validation
      describe('Price Validation', () => {
        // Not Null
        test('Validate null price ', done => {
          request(app)
            .post('/products')
            .set('access_token', AdminToken)
            .send({
              name: 'Kaos Kaki',
              image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
              price: null,
              stock: 5,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', ['Price Cannot Null'])
              done();
            })
        })
        // Cannot Negative
        test('Validate negative price ', done => {
          request(app)
            .post('/products')
            .set('access_token', AdminToken)
            .send({
              name: 'Kaos Kaki',
              image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
              price: -1,
              stock: 5,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', ['Price Cannot Negative'])
              done();
            })
        })
      })
      // stock Validation
      describe('Stock Validation', () => {
        // Not Null
        test('Validate null stock ', done => {
          request(app)
            .post('/products')
            .set('access_token', AdminToken)
            .send({
              name: 'Kaos Kaki',
              image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
              price: 100,
              stock: null,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', ['Stock Cannot Null'])
              done();
            })
        })
        // Cannot Negative
        test('Validate negative stock ', done => {
          request(app)
            .post('/products')
            .set('access_token', AdminToken)
            .send({
              name: 'Kaos Kaki',
              image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
              price: 100,
              stock: -1,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', ['Stock Cannot Negative'])
              done();
            })
        })
      })
      // Not Admin (Authorization)
      describe('Not Authorized', () => {
        test('Customer cannot add product', done => {
          request(app)
            .post('/products')
            .set('access_token', CustomerToken)
            .send({
              name: 'Kaos Kaki',
              image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
              price: 100,
              stock: 1000,
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.body).toHaveProperty('message', 'You Are Not Authorized');
              expect(res.status).toBe(401);
              done();
            })
        })
      })
    })
  })

  // Read Product Validation
  describe('Read Product', () => {
    // Success
    describe('Success Read Product', () => {
      // Admin Read
      test('Correct authentication to read product with admin token', done => {
        request(app)
          .get('/products')
          .set('access_token', AdminToken)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body.data).toHaveLength(2)
            expect(res.body.data[0]).toHaveProperty('name', 'image_url', 'price', 'stock')
            expect(res.status).toBe(200);
            done();
          })
      })
      // Custome Read
      test('Correct authentication to read product with customer token', done => {
        request(app)
          .get('/products')
          .set('access_token', CustomerToken)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body.data).toHaveLength(2)
            expect(res.body.data[0]).toHaveProperty('name', 'image_url', 'price', 'stock')
            expect(res.status).toBe(200);
            done();
          })
      })
    })
    // Fail
    describe('Fail Read Product', () => {
      // wrong token
      test('Wrong authentication to read product', done => {
        request(app)
          .get('/products')
          .set('access_token', 'wrong token')
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'You Must Register First');
            expect(res.status).toBe(401);
            done();
          })
      })

    })
  })
  // Read One Product
  describe('Read One Product', () => {
    // Success
    describe('Success Read One Product', () => {
      // With Admin Token
      test('Success read one with admin token', done => {
        request(app)
          .get(`/products/${idProduct1}`)
          .set('access_token', AdminToken)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body.data).toHaveProperty('name', 'Buku');
            expect(res.body.data).toHaveProperty('image_url', 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg');
            expect(res.body.data).toHaveProperty('price', 1500);
            expect(res.body.data).toHaveProperty('stock', 10);
            expect(res.status).toBe(200);
            done();
          })
      })
      // With Customer Token
      test('Success read one with admin token', done => {
        request(app)
          .get(`/products/${idProduct2}`)
          .set('access_token', CustomerToken)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body.data).toHaveProperty('name', 'Baju');
            expect(res.body.data).toHaveProperty('image_url', 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg');
            expect(res.body.data).toHaveProperty('price', 1500.5);
            expect(res.body.data).toHaveProperty('stock', 100);
            expect(res.status).toBe(200);
            done();
          })
      })
    })
    // Fail
    describe('Fail Read One Product', () => {
      // wrong token
      test('Wrong token to get one product', done => {
        request(app)
          .get(`/products/${idProduct2}`)
          .set('access_token', 'wrong token')
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'You Must Register First');
            expect(res.status).toBe(401);
            done();
          })
      })
      // wrong product id
      test('Wrong token to get one product', done => {
        request(app)
          .get(`/products/${-10}`)
          .set('access_token', AdminToken)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'Not Found');
            expect(res.status).toBe(404);
            done();
          })
      })
    })
  })
  // Update Product Validation
  describe('Update Product', () => {
    // Success
    describe('Success Update Product', () => {
      test('Success update with admin token', done => {
        request(app)
          .put(`/products/${idProduct1}`)
          .set('access_token', AdminToken)
          .send({
            name: 'Kaos Kaki',
            image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
            price: 100,
            stock: 5,
          })
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'Success Update Data');
            expect(res.status).toBe(201);
            done();
          })
      })
    })
    // Failure
    describe('Fail Update Product', () => {
      // Not Authorized Customer
      test('Not authorized customer', done => {
        request(app)
          .put(`/products/${idProduct1}`)
          .set('access_token', CustomerToken)
          .send({
            name: 'Kaos Kaki',
            image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
            price: 1002,
            stock: 52,
          })
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'You Are Not Authorized');
            expect(res.status).toBe(401)
            done();
          })
      })
      // Wrong Id
      test('Wrong id product', done => {
        request(app)
          .put(`/products/${-10}`)
          .set('access_token', AdminToken)
          .send({
            name: 'Kaos Kaki',
            image_url: 'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
            price: 1002,
            stock: 52,
          })
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'Not Found');
            expect(res.status).toBe(404);
            done();
          })
      })
    })
  })
  // Delete Product Validation
  describe('Delete Product', () => {
    // Success
    describe('Success Delete Product', () => [
      test('Admin can delete product', done => {
        request(app)
          .delete(`/products/${idProduct1}`)
          .set('access_token', AdminToken)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'Success Delete Data');
            expect(res.status).toBe(200);
            done();
          })
      })
    ])
    // Fail
    describe('Fail Delete Product', () => {
      // Not Authorized Customer Token
      test('Not authorized customer', done => {
        request(app)
          .delete(`/products/${idProduct1}`)
          .set('access_token', CustomerToken)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'You Are Not Authorized');
            expect(res.status).toBe(401);
            done();
          })
      })
      // Wrong Product Id
      test('Wrong product id', done => {
        request(app)
          .delete(`/products/${7}`)
          .set('access_token', AdminToken)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('message', 'Not Found');
            expect(res.status).toBe(404);
            done();
          })
      })
    })
  })

})
