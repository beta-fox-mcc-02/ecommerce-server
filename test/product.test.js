const { User, Category, Role, sequelize: { queryInterface } } = require('../models')
const app = require('../app')
const request = require('supertest')
const fs = require('fs')
let product_id = 0
let category_id = 0
let user = ''

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
let token
let invalid_token
const jwt = require('jsonwebtoken')

beforeAll(done => {
  let input = {
    first_name: 'Budi',
    username: 'budiagung',
    password: 'agung2010',
    email: 'budiagung@gmail.com',
    role_id: 1
  }

  User.create(input)
  .then(user => {
    return User.findOne({
      include: [Role],
      where: {
        id: user.id
      }
    })
  })
  .then(user => {
    user = user
    token = jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.Role
    }, process.env.SECRET)
    return Category.create({
      name: 'Bearing',
      path: 'Bearing'
    })
  })
  .then(category => {
    category_id = category.id
    input = {
      first_name: 'Jaka',
      username: 'jaka9000',
      password: 'jaka2010',
      email: 'jakaagung@gmail.com',
      role_id: 2
    }
    return User.create(input)
  })
  .then(user => {
    return User.findOne({
      include: [Role],
      where: {
        id: user.id
      }
    })
  })
  .then(user => {
    invalid_token = jwt.sign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.Role
      }, process.env.SECRET)
    done()
  })
  .catch(err => {
    done(err)
  })
})

afterAll((done) => {
  queryInterface.bulkDelete('Users', {})
    .then(response => {
      done()
    }).catch(err => done(err))

  Category.destroy({
    where: {},
    truncate: true,
    cascade: true
  })
    .then(response => {
      done()
    })
    .catch(err => done(err))

  queryInterface.bulkDelete('Products', {})
    .then(response => {
      done()
    }).catch(err => done(err))
})

describe('Product Routes', () => {
  describe('Create Product Test', () => {
    describe('Creat Product Success', () => {
      test('it should return a object new product and status 201', (done) => {
        const product =
        {
          name: 'Bearing A',
          price: 15000,
          stock: 10,
          category_id,
          SKU: 'BA-1000',
          description: 'Deskripsi Bearing A',
          weight: 23
        }
        request(app)
          .post('/products')
          .set('Authorization', 'Bearer ' + token)
          .field('name', product.name)
          .field('price', product.price)
          .field('stock', product.stock)
          .field('category_id', product.category_id)
          .field('SKU', product.SKU)
          .field('description', product.description)
          .field('weight', product.weight)
          .end((err, response) => {
            expect(err).toBe(null)
            product_id = response.body.product.id
            expect(response.body.product).toHaveProperty('id', expect.any(Number))
            expect(response.body.product).toHaveProperty('name', 'Bearing A')
            expect(response.body.product).toHaveProperty('price', 15000)
            expect(response.body.product).toHaveProperty('stock', 10)
            expect(response.body.product).toHaveProperty('SKU', 'BA-1000')
            expect(response.body.product).toHaveProperty('description', 'Deskripsi Bearing A')
            expect(response.body.product).toHaveProperty('weight', "23.00")
            expect(response.status).toBe(201)
            done()
          })
        })
      })

    describe('Create Product Failed', () => {

      test('it should return unique validation error and status 400', (done) => {
        const product =
        {
          name: 'Bearing A',
          price: 15000,
          stock: 10,
          category_id,
          SKU: 'BA-1000',
          description: 'Deskripsi Bearing A',
          weight: 23
        }
        request(app)
          .post('/products')
          .set('Authorization', 'Bearer ' + token)
          .field('name', product.name)
          .field('price', product.price)
          .field('stock', product.stock)
          .field('category_id', product.category_id)
          .field('SKU', product.SKU)
          .field('description', product.description)
          .field('weight', product.weight)
          .end((err, response) => {
            const expected = ['name must be unique']
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'BAD REQUEST')
            expect(response.body).toHaveProperty('message', 'UNIQUE_VALIDATION')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors.length).toBeGreaterThan(0)
            expect(response.body.errors).toEqual(expect.arrayContaining(expected))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('it should return input error and status 400', (done) => {
        const product =
        {
          name: 'Bearing A',
          price: 0,
          stock: -10,
          category_id,
          SKU: 'BA-1000',
          description: 'Deskripsi Bearing A',
          weight: 23
        }
        request(app)
          .post('/products')
          .set('Authorization', 'Bearer ' + token)
          .field('name', product.name)
          .field('price', product.price)
          .field('stock', product.stock)
          .field('category_id', product.category_id)
          .field('SKU', product.SKU)
          .field('description', product.description)
          .field('weight', product.weight)
          .end((err, response) => {
            const expected = ['Price has to be greater than zero', 'Stock minimal zero']
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'BAD REQUEST')
            expect(response.body).toHaveProperty('message', 'INPUT_ERROR')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors.length).toBeGreaterThan(0)
            expect(response.body.errors).toEqual(expect.arrayContaining(expected))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('it should return unauthorized token validation and status 401', (done) => {
        const product =
        {
          name: 'Bearing ABC',
          price: 90000,
          stock: 100,
          category_id,
          SKU: 'ABC-1000',
          description: 'Deskripsi Bearing A',
          weight: 23
        }
        request(app)
          .post('/products')
          .set('Authorization', 'Bearer ' + token + 'a')
          .field('name', product.name)
          .field('price', product.price)
          .field('stock', product.stock)
          .field('category_id', product.category_id)
          .field('SKU', product.SKU)
          .field('description', product.description)
          .field('weight', product.weight)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'UNAUTHORIZED')
            expect(response.body).toHaveProperty('message', expect.any(String))
            expect(response.status).toBe(401)
            done()
          })
      })

      test('it should return unauthorized token validation and status 401', (done) => {
        const product =
        {
          name: 'Bearing ABC',
          price: 90000,
          stock: 100,
          category_id,
          SKU: 'ABC-1000',
          description: 'Deskripsi Bearing A',
          weight: 23
        }
        request(app)
          .post('/products')
          .set('Authorization', 'Bearer ' + invalid_token)
          .field('name', product.name)
          .field('price', product.price)
          .field('stock', product.stock)
          .field('category_id', product.category_id)
          .field('SKU', product.SKU)
          .field('description', product.description)
          .field('weight', product.weight)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'UNAUTHORIZED')
            expect(response.body).toHaveProperty('message', expect.any(String))
            expect(response.status).toBe(401)
            done()
          })
        })
      })
    })

  describe('Update Product Test', () => {
    describe('Update Product Success', () => {
      test('it should return an updated object product and status 200', (done) => {
        const product =
        {
          name: 'Packing Head',
          price: 125000,
          stock: 9,
          category_id,
          SKU: 'PH-2100',
          description: 'Deskripsi Packing Head',
          weight: 10
        }
        request(app)
          .put('/products/' + product_id)
          .set('Authorization', 'Bearer ' + token)
          .send(product)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body.product).toHaveProperty('id', expect.any(Number))
            expect(response.body.product).toHaveProperty('name', 'Packing Head')
            expect(response.body.product).toHaveProperty('price', 125000)
            expect(response.body.product).toHaveProperty('stock', 9)
            expect(response.body.product).toHaveProperty('SKU', 'PH-2100')
            expect(response.body.product).toHaveProperty('description', 'Deskripsi Packing Head')
            expect(response.body.product).toHaveProperty('weight', "10.00")
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Update Product Failed', () => {
      test('it should return input error and status 400', (done) => {
        const product =
        {
          name: 'Packing Head',
          price: 0,
          stock: -10,
          category_id,
          SKU: '',
          description: 'Deskripsi Packing Head',
          weight: 10
        }
        request(app)
          .put('/products/' + product_id)
          .set('Authorization', 'Bearer ' + token)
          .send(product)
          .end((err, response) => {
            const expected = ['Price has to be greater than zero', 'Stock minimal zero']
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'BAD REQUEST')
            expect(response.body).toHaveProperty('message', 'INPUT_ERROR')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors.length).toBeGreaterThan(0)
            expect(response.body.errors).toEqual(expect.arrayContaining(expected))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('it should return role validation and status 401', (done) => {
        const product =
        {
          name: 'Packing Head',
          price: 0,
          stock: -10,
          category_id,
          SKU: '',
          description: 'Deskripsi Packing Head',
          weight: 10
        }
        request(app)
          .put('/products/' + product_id)
          .set('Authorization', 'Bearer ' + invalid_token)
          .send(product)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'UNAUTHORIZED')
            expect(response.body).toHaveProperty('message', expect.any(String))
            expect(response.status).toBe(401)
            done()
          })
      })
    })
  })

  describe('Delete Product Test', () => {
    describe('Delete Product Success', () => {
      test('it should return a message when user delete product and status 200', (done) => {
        request(app)
          .delete('/products/' + product_id)
          .set('Authorization', 'Bearer ' + token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message', `Delete product with id ${product_id} successfully`)
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Delete Product Failed', () => {
      test('it should return token existing or not and status 400', (done) => {
        request(app)
          .delete('/products/' + product_id)
          .set('Authorization', 'Bearer ')
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'BAD REQUEST')
            expect(response.body).toHaveProperty('message', 'LOGIN_FAILED')
            expect(response.body).toHaveProperty('error', expect.any(String))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('it should return role validation and status 401', (done) => {
        request(app)
          .delete('/products/' + product_id)
          .set('Authorization', 'Bearer ' + invalid_token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'UNAUTHORIZED')
            expect(response.body).toHaveProperty('message', expect.any(String))
            expect(response.status).toBe(401)
            done()
          })
      })
    })
  })
})