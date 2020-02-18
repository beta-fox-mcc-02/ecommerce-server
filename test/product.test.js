const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'indomie'

describe('Product Routes Test', () => {
  let token
  beforeAll((done) => {
    let data = {
      username: 'Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      isAdmin: true
    }
    User
      .create(data)
      .then(user => {
        let payload = {
          id: user.id,
          username: user.username,
          email: user.email 
        }
       token = jwt.sign(payload, SECRET)
       done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll((done) => {
    queryInterface
      .bulkDelete('Users', {})
      .then(response => {
        done()
      })
      .catch(err => done(err))
  })

  describe('Create Product Test', () => {
    describe('Create Product Success Test', () => {
      test('it should be success and return new product data and have status 201', (done) => {
        console.log(token, '=====')
        request(app)
          .post('/products')
          .send({
            name: 'Jam Import',
            imageUrl: 'https://freshsparks.com/wp/wp-content/uploads/2014/10/project_image_icon_TIS.jpg',
            price: 20000,
            stock: 11
          })
          .set('token', token)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(201)
            expect(res.body.data).toHaveProperty('name', expect.any(String))
            expect(res.body.data).toHaveProperty('imageUrl', expect.any(String))
            expect(res.body.data).toHaveProperty('price', expect.any(Number))
            expect(res.body.data).toHaveProperty('stock', expect.any(Number))
            expect(res.body).toHaveProperty('msg', 'Create Product Success')
            done()
          })
      })
    })

    describe('Create Product Failed Test', () => {
      test('it should be failed and have status 400 if input is undifined', (done) => {
        request(app)
        .post('/products')
        .send({
        })
        .set('token', token)
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('msg', 'Bad Request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toHaveLength(2)
          expect(res.body.errors).toEqual(expect.arrayContaining(
            ['Please enter product name', 'Image Url cannot be empty']
          ))
          done()
        })
      })

      test('it should be failed and have status 400 if input is empty string and 0 price and 0 stock', (done) => {
        request(app)
        .post('/products')
        .send({
          name: '',
          imageUrl: '',
          price: 0,
          stock: 0
        })
        .set('token', token)
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('msg', 'Bad Request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toHaveLength(4)
          expect(res.body.errors).toEqual(expect.arrayContaining(
            ['Please enter product name', 'Image Url cannot be empty', 'Price minimal is 10000', 'Stock minimal is 10']
          ))
          done()
        })
      })

      test('it should be failed and have status 401 if dont have access token', (done) => {
        request(app)
        .post('/products')
        .send({
          name: 'Jam Tangan',
          imageUrl: 'https://freshsparks.com/wp/wp-content/uploads/2014/10/project_image_icon_TIS.jpg',
          price: 10000,
          stock: 11
        })
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('msg', 'You Must Login First')
          done()
        })
      })

    })
  })

  describe('Get Product Test', () => {
    describe('Get Product Success', () => {
      test('it should be success, return products data and return status 200', (done) => {
        request(app)
          .get('/products')
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('data', expect.any(Array))
            done()
          })
      })
    })
  })
})