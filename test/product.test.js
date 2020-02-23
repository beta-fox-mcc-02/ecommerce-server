const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, Product, sequelize } = require('../models')
const {queryInterface} = sequelize
const { JwtHelper, BcryptHelper } = require('../helpers/index')

describe('Product Routes', () => {
   let access_token
   let access_token_user
   let productId

   beforeAll(done => {
      let newAdmin = {
         name : 'Admin',
         email : 'admin@mail.com',
         password : 'qwerty',
         RoleId : 1
      }
      User.create(newAdmin)
         .then(user => {
            const payload = {
               id : user.id,
               email : user.email,
               RoleId : user.RoleId
            }
            access_token = JwtHelper.generateToken(payload)
            // console.log(access_token)
            let newUser = {
              name : 'gamer',
              email : 'user@mail.com',
              password : 'qwerty',
              RoleId : 2
           }
           User.create(newUser)
              .then(user => {
                 const payload = {
                    id : user.id,
                    email : user.email,
                    RoleId : user.RoleId
                 }
                 access_token_user = JwtHelper.generateToken(payload)
                 done()
              })
              .catch(err => {
                 done(err)
              })

          })
         .catch(err => {
            done(err)
         })
   })

   beforeAll(done => {
      let newProduct = {
        name : 'Testing Games',
        image_url : 'http://google.com',
        price : 100000,
        stock : 5,
        genre : 'Adventure',
        CategoryId : 1        
      }
      Product.create(newProduct, {
        returning: true
      })
        .then(product => {
          id = product.id
          done()
        })
        .catch(err => {
          done(err)
        })
   })

   afterAll(done => {
    queryInterface.bulkDelete('Users', {})
       .then(response => {done()})
       .catch(err => done(err))
   })

   //CREATE
   describe('product create', () => {
      test('success create product', done => {
         request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
               name : 'Warcraft',
               image_url : 'http://google.com',
               price : 100000,
               stock : 5,
               genre : 'Adventure',
               CategoryId : 1
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('data', expect.any(Object))
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(201)
               done()
            })
      })

      test('minimal stock and price are zero', done => {
         request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
               name : 'Warcraft',
               image_url : 'http://google.com',
               price : -5,
               stock : -5,
               genre : 'Adventure',
               CategoryId : 1
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('not authenticate', done => {
         request(app)
            .post('/products')
            .send({
               name : 'Warcraft',
               image_url : 'http://google.com',
               price : 100000,
               stock : 5,
               genre : 'Adventure',
               CategoryId : 1
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('not authorize', done => {
         request(app)
            .post('/products')
            .set('access_token', access_token_user)
            .send({
               name : 'Warcraft',
               image_url : 'http://google.com',
               price : 100000,
               stock : 5,
               genre : 'Adventure',
               CategoryId : 1
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(401)
               done()
            })
      })
   })

   //READ
   describe('get product', () => {
      //FIND ALL
      test('success get all product', done => {
         request(app)
            .get('/products')
            .set('access_token', access_token)
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('data', expect.any(Array))
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(200)
               done()
            })
      })

      // test('not authenticate', done => {
      //    request(app)
      //       .get('/products')
      //       .end((err, response) => {
      //          expect(err).toBe(null)
      //          expect(response.body).toHaveProperty('err', expect.any(Object))
      //          expect(response.body).toHaveProperty('msg', expect.any(String))
      //          expect(response.status).toBe(400)
      //          done()
      //       })
      // })

      // test('not authorize', done => {
      //    request(app)
      //       .get('/products')
      //       .set('access_token', access_token_user)
      //       .end((err, response) => {
      //          expect(err).toBe(null)
      //          expect(response.body).toHaveProperty('err', expect.any(Object))
      //          expect(response.body).toHaveProperty('msg', expect.any(String))
      //          expect(response.status).toBe(401)
      //          done()
      //       })
      // })

      //FIND ONE
      test('success get one product', done => {
         request(app)
            .get(`/products/${id}`)
            .set('access_token', access_token)
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('data', expect.any(Object))
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(200)
               done()
            })
      })

      test('product id not found', done => {
        request(app)
           .get('/products/10000')
           .set('access_token', access_token)
           .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(String))
              expect(response.status).toBe(400)
              done()
           })
     })

      test('not authenticate', done => {
         request(app)
            .get(`/products/${id}`)
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('not authorize', done => {
         request(app)
            .get(`/products/${id}`)
            .set('access_token', access_token_user)
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(401)
               done()
            })
      })
   })

   
   //UPDATE
   describe('update product', () => {
      test('success update product', done => {
        console.log(id, '===================')
         request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send({
               name : 'Warcraft',
               image_url : 'http://google.com',
               price : 200000,
               stock : 5,
               genre : 'Adventure',
               CategoryId : 1
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(200)
               done()
            })
      })

      test('minimal stock and price are zero', done => {
         request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send({
               name : 'Warcraft',
               image_url : 'http://google.com',
               price : -5,
               stock : -5,
               genre : 'Adventure',
               CategoryId : 1
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('product id not found', done => {
        request(app)
           .put('/products/100000000')
           .set('access_token', access_token)
           .send({
              name : 'Warcraft',
              image_url : 'http://google.com',
              price : 200000,
              stock : 5,
              genre : 'Adventure',
              CategoryId : 1
           })
           .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(String))
              expect(response.status).toBe(400)
              done()
           })
     })

      test('not authenticate', done => {
         request(app)
            .put(`/products/${id}`)
            .send({
               name : 'Warcraft',
               image_url : 'http://google.com',
               price : 200000,
               stock : 5,
               genre : 'Adventure',
               CategoryId : 1
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('not authorize', done => {
         request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token_user)
            .send({
               name : 'Warcraft',
               image_url : 'http://google.com',
               price : 200000,
               stock : 5,
               genre : 'Adventure',
               CategoryId : 1
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(401)
               done()
            })
      })
   })

   //DELETE
   describe('delete product', () => {
      test('success delete product', done => {
        // console.log(id, '===================')
        // console.log(access_token)
         request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token)
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(200)
               done()
            })
      })

      test('product not found', done => {
         request(app)
            .delete('/products/10000000000')
            .set('access_token', access_token)
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('not authenticate', done => {
         request(app)
            .delete('/products/1')
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('not authorize', done => {
         request(app)
            .delete('/products/1')
            .set('access_token', access_token_user)
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(401)
               done()
            })
      })
   })
})
