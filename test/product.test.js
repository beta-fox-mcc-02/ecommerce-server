const request = require('supertest')
const app = require('../app')
const { Product, User } = require('../models')
const { generateToken } = require('../helpers/jwt')


describe("Product test", () => {
  //cerate a dummy token to pass auth
  let token = '' 
  let productId = 0
  //deleting all input to database
  afterAll(done => {
    token = ''
    User.destroy({
      where: {}
    })
      .then(() => {
        return Product.destroy({
          where: {}
        })
      })
      .then(() => done())
      .catch(err => done(err))
  })

  //create dummy user and product
  beforeAll(done => {
    User.create({
      username: 'adminTest',
      email: 'test@admin.com',
      password: '123',
      role: true
    })
      .then(user => {
        token = generateToken(user.id)
        return Product.create({
          name: 'Motorolla Razr',
          image_url: 'https://embedsocial.com/admin/story-media/feed-media/17908/17908034296408556/image_0_large.jpeg',
          price: 21000000,
          stock: 100,
          CategoryId: 1
        })
      })
      .then(product => {
        productId = product.id
        done()
      })
      .catch(done)
  })
  describe("Auth test", ()=> {
    describe("Authentication error test", () => {
      test("Should contain error with message to login first and status code of 401", done => {
        request(app)
            .post('/products')
            .set('token', 'WrongTOken')
            .send({
              name: 'Samsung Galaxy Z Flip',
              image_url: 'https://embedsocial.com/admin/story-media/feed-media/17908/17908034296408556/image_0_large.jpeg',
              price: 300000000,
              stock: 1000,
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.status).toBe(500)
              done()
        })
      })
    })

    describe("Authorization error test", () => {
      //create a dummy non-admin user
      let token2 = ''
      beforeEach(done => {
        User.create({
          username: 'customerTest',
          email: 'test@customer.com',
          password: '123',
          role: false
        })
          .then(user => {
            token2 = generateToken(user.id)
            done()
          })
          .catch(done)
      })
      
      test("Should contain error with message No access available and status code of 401", done => {
        request(app)
            .post('/products')
            .set('token', token2)
            .send({
              name: 'Teslo model X',
              image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQOSDJygafCAd-l7lTTvYS3QTf2B1inytMPefhwASq9Dcd-jxkz',
              price: 10000000000,
              stock: 10,
              CategoryId: 2
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.status).toBe(500)
              done()
        })
      })
    })
  })

  describe("Products test", () => {
    describe("findAll products", () => {
      describe("findAll success", () => {
        test("Should return an array of objects containing all products", done => {
          request(app)
            .get('/products')
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.status).toBe(200)
              expect(response.body).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({ name: 'Motorolla Razr' })
                ]))
              done()
            })
        })
      })
    })

    describe("findByPk a product", () => {
      describe("fidnByPk success", () => {
        test("It should return an object with product data in it and status code of 200", done => {
          request(app)
            .get(`/products/${productId}`)
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.status).toBe(200)
              expect(response.body).toEqual(
                expect.objectContaining({ name: 'Motorolla Razr' })
              )
              done()
            })
        })
      })
    })

    describe("create a product", () => {
      describe("create success", () => {
        test("It should return an object with a message success and status code of 201", done => {
          request(app)
            .post(`/products`)
            .set('token', token)
            .send({
              name: 'Oneplus 7 Pro',
              image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQOSDJygafCAd-l7lTTvYS3QTf2B1inytMPefhwASq9Dcd-jxkz',
              price: 8000000,
              stock: 200,
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.status).toBe(201)
              expect(response.body).toEqual(
                expect.objectContaining({ message: "create products successful" })
              )
              done()
            })
        })
      })

      describe("create error", () => {
        test("It should return an array of object with a message success and status code of 400", done => {
          request(app)
            .post(`/products`)
            .set('token', token)
            .send({
              image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQOSDJygafCAd-l7lTTvYS3QTf2B1inytMPefhwASq9Dcd-jxkz'
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.status).toBe(400)
              expect(response.body).toEqual(
                expect.objectContaining({ errors : ["Product name cannot empty", "Product price cannot null", "Product stock cannot null"] })
              )
              done()
            })
        })
      })
    })

    describe("update product", () => {
      describe("update success", () => {
        test("It should return an object with a message success and status code of 201", done => {
          request(app)
            .put(`/products/${productId}/update`)
            .set('token', token)
            .send({
              price: 9000000,
              stock: 80
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.status).toBe(201)
              expect(response.body).toEqual(
                expect.objectContaining({ message: "update products successful" })
              )
              done()
            })
        })
      })

      describe("update error", () => {
        describe("No item found", () => {
          test("It should return an array of object with a message errors and status code of 400", done => {
            request(app)
              .put(`/products/0/update`)
              .set('token', token)
              .send({
                price: 9000000,
                stock: 80
              })
              .end((err, response) => {
                expect(err).toBe(null)
                expect(response.status).toBe(400)
                expect(response.body).toEqual(
                  expect.objectContaining({ errors : ["No product updated"] })
                )
                done()
              })
          })
        })

        describe("validation error", () => {
          test("It should return an array of object with a message errors and status code of 400", done => {
            request(app)
              .put(`/products/${productId}/update`)
              .set('token', token)
              .send({
                name: '',
                price: 9500000,
                stock: 50
              })
              .end((err, response) => {
                expect(err).toBe(null)
                expect(response.status).toBe(400)
                expect(response.body).toEqual(
                  expect.objectContaining({ errors : ["Product name cannot empty"] })
                )
                done()
              })
          })
        })

      })
    })

    describe("Product delete test", () => {
      describe("delete success", () => {
        test("It should return an object contain a message of successful delete with status code of 200", done => {
          request(app)
          .delete(`/products/${productId}/delete`)
          .set('token', token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(
              expect.objectContaining({ message: "Delete product successful" })
            )
            done()
          })
        })
      })

      describe("delete error", () => {
        test("It should return an array og object errors code of 400", done => {
          request(app)
          .delete(`/products/0/delete`)
          .set('token', token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(400)
            expect(response.body).toEqual(
              expect.objectContaining({ errors : ["No product deleted"] })
            )
            done()
          })
        })
      })
    })
  })

})