const request = require('supertest')
const app = require('../app')
const { User, sequelize, Product } = require('../models')
const { queryInterface } = sequelize
let jwt = require('jsonwebtoken')
let token
let tokenNotAdmin
let productId

describe(`Product Routes`, () => {
   // ======================================== HOOKS ====================================
   beforeAll((done) => {
      let newUser = {
         name: `dummyyy`,
         email: `dummyyy@dummy.com`,
         password: `12345`,
         isAdmin: true
      }
      User.create(newUser)
         .then(data => {
            token = jwt.sign({ id: data.id }, process.env.SECRET);
            return User.create({
               name: `dummy212`,
               email: `dummy212@dummy.com`,
               password: `12345`,
            })
         })
         .then(notAdmin => {
            tokenNotAdmin = jwt.sign({ id: notAdmin.id }, process.env.SECRET);
            return Product.create({
               name: `spongebob pants`,
               image_url: `dummy`,
               price: 300000,
               stock: 5,
               CategoryId: 1
            })
         })
         .then(product => {
            productId = product.id
            done()
         })
         .catch(err => {
            done(err)
         })
   })

   afterAll(done => {
      queryInterface.bulkDelete('Users', {})
         .then(res => {
            done()
         })
         .catch(err => {
            done(err)
         })
   })
   afterAll(done => {
      queryInterface.bulkDelete('Products', {})
         .then(res => {
            done()
         })
         .catch(err => {
            done(err)
         })
   })

   describe(`Product create`, () => {
      // ======================================== SUCCESS =================================================
      test(`should return new product data and give status 201`, (done) => {
         request(app)
            .post(`/products`)
            .send({
               name: `avantgarde cloth`,
               image_url: `dummy`,
               price: 300000,
               stock: 5,
               CategoryId: 1
            })
            .set({
               token
            })
            .end((err, res) => {
               // console.log(res);

               expect(err).toBe(null)
               expect(res.status).toBe(201)
               expect(res.body).toHaveProperty('name', expect.any(String))
               expect(res.body).toHaveProperty('image_url', expect.any(String))
               expect(res.body).toHaveProperty('price', expect.any(Number))
               expect(res.body).toHaveProperty('stock', expect.any(Number))
               expect(res.body).toHaveProperty('CategoryId', expect.any(Number))
               done()
            })
      })

      // ============================================= FAILED ============================================
      test(`Should return validation that token is invalid and status 401 of unathorized`, (done) => {
         request(app)
            .post('/products')
            .send({
               name: `avantgarde cloth`,
               image_url: `dummy`,
               price: 300000,
               stock: 5,
               CategoryId: 1
            })
            .set({ token: `cickcikcickcik` })
            .end((err, res) => {
               expect(err).toBe(null)
               expect(res.status).toBe(401)
               expect(res.body).toHaveProperty('msg', 'jwt malformed')
               done()
            })
      })

      test(`should return errors validation and give status 400`, (done) => {
         request(app)
            .post(`/products`)
            .send({
               name: ``,
               image_url: ``,
               price: '',
               stock: '',
               CategoryId: ''
            })
            .set({
               token
            })
            .end((err, res) => {
               expect(err).toBe(null)
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('msg', expect.any(Array))
               done()
            })
      })

      test(`should return message not authorized and give status 401`, (done) => {
         request(app)
            .post('/products')
            .send({
               name: `avantgarde cloth`,
               image_url: `dummy`,
               price: 300000,
               stock: 5,
               CategoryId: 1
            })
            .set({
               token: tokenNotAdmin
            })
            .end((err, res) => {
               expect(err).toBe(null)
               expect(res.status).toBe(401)
               done()
            })
      })
   })

   describe(`get all product`, () => {
      // ============================================ SUCCESS =========================================
      test.only(`should return data products and give status 200`, (done) => {
         request(app)
            .get('/products')
            .set({
               token
            })
            .end((err, res) => {
               expect(err).toBe(null)
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('data', expect.any(Array))
               done()
            })
      })

      // ============================================== FAILED ==========================================
      test(`Should return validation that you must provide jwt and status 401 of unathorized`, (done) => {
         request(app)
            .get('/products')
            .end((err, res) => {               
               expect(err).toBe(null)
               expect(res.status).toBe(401)
               expect(res.body).toHaveProperty('msg', 'jwt must be provided')
               done()
            })
      })
   })

   describe(`update product`, () => {
      // ============================================== SUCCESS ==========================================
      test(`should return updated data and have status 200`, (done) => {
         request(app)
            .put(`/products/${productId}`)
            .send({
               name: 'dungdungpret'
            })
            .set({
               token
            })
            .end((err, res) => {
               expect(err).toBe(null)
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty(`data`, expect.any(Array))
               done()
            })
      })

      // ============================================= FAILED ===========================================
      test(`Should return validation that you must provide jwt and status 401 of unathorized`, (done) => {
         request(app)
            .put(`/products/${productId}`)
            .send({
               name: 'dungdungpret'
            })
            .set({
               // token
            })
            .end((err, res) => {               
               expect(err).toBe(null)
               expect(res.status).toBe(401)
               expect(res.body).toHaveProperty('msg', 'jwt must be provided')
               done()
            })
      }) 

      test(`should return message that product not found and give status 404`, (done) => {
         request(app)
            .put(`/products/1000`)
            .send({
               name: 'dungdungpret'
            })
            .set({
               token
            })
            .end((err, res) => {  
               expect(err).toBe(null)
               expect(res.status).toBe(404)
               expect(res.body).toHaveProperty('msg', 'Product not found')
               done()
            })
      }) 
   })

   describe(`delete product`, () => {
      // ============================================== SUCCESS ==========================================
      test(`should return delete confirmation and have status 200`, (done) => {
         request(app)
            .delete(`/products/${productId}`)
            .set({
               token
            })
            .end((err, res) => {
               expect(err).toBe(null)
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('msg', `product with ${productId} deleted`)
               done()
            })
      })

      // ============================================= FAILED ===========================================
      test(`Should return validation that you must provide jwt and status 401 of unathorized`, (done) => {
         request(app)
            .delete(`/products/${productId}`)            
            .set({
               // token
            })
            .end((err, res) => {               
               expect(err).toBe(null)
               expect(res.status).toBe(401)
               expect(res.body).toHaveProperty('msg', 'jwt must be provided')
               done()
            })
      }) 

      test(`should return message that product not found and give status 404`, (done) => {
         request(app)
            .delete(`/products/9999`)
            .send({
               name: 'dungdungpret'
            })
            .set({
               token
            })
            .end((err, res) => {  
               expect(err).toBe(null)
               expect(res.status).toBe(404)
               expect(res.body).toHaveProperty('msg', 'Product not found')
               done()
            })
      }) 
   })
})