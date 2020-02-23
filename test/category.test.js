const { User, Role, Category, sequelize: { queryInterface } } = require('../models')
const app = require('../app')
const request = require('supertest')
let category_id = 0

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
let token;
let invalid_token;
const jwt = require('jsonwebtoken')
describe('Category Routes', () => {

  beforeAll((done) => {
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
  })

  describe('Create Category Test', () => {
    describe('Creat Category Success', () => {
      test('it should return a object new category and status 201', (done) => {
        let input = {
          first_name: 'Budi',
          username: 'budiagung',
          password: 'agung2010',
          email: 'budiagung@gmail.com',
          role_id: 1
        }
        User.create(input)
          .then(user => {
            User.findOne({
              include: [Role],
              where: {
                id: user.id
              }
            })
              .then(user => {
                token = jwt.sign({
                  id: user.id,
                  email: user.email,
                  username: user.username,
                  role: user.Role
                }, process.env.SECRET)
                request(app)
                  .post('/categories')
                  .send({
                    name: 'Bearing',
                    path: 'bearing',
                  })
                  .set('Authorization', 'Bearer ' + token)
                  .end((err, response) => {
                    expect(err).toBe(null)
                    category_id = response.body.data.id
                    expect(response.body.data).toHaveProperty('id', expect.any(Number))
                    expect(response.body.data).toHaveProperty('name', 'Bearing')
                    expect(response.body.data).toHaveProperty('path', 'bearing')
                    expect(response.body).toHaveProperty('message', 'CATEGORY_CREATED')
                    expect(response.status).toBe(201)
                    done()
                  })
              })
              .catch(err => {
                done(err)
              })
          })
          .catch(err => {
            done(err)
          })
      })
    })

    describe('Create Category Failed', () => {

      test('it should return input error and status 400', (done) => {
        request(app)
          .post('/categories')
          .send({
            name: '',
            path: '',
          })
          .set('Authorization', 'Bearer ' + token)
          .end((err, response) => {
            const expected = ['Name is required']
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

      test('it should return unique validation error and status 400', (done) => {
        request(app)
          .post('/categories')
          .send({
            name: 'Bearing',
            path: 'bearing',
          })
          .set('Authorization', 'Bearer ' + token)
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

      test('it should return unauthorized token validation and status 400', (done) => {
        request(app)
          .post('/categories')
          .send({
            name: 'Seal',
            path: 'seal',
          })
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

      test('it should return unauthorized role validation and status 401', (done) => {
        input = {
          first_name: 'Jaka',
          username: 'jaka9000',
          password: 'jaka2010',
          email: 'jakaagung@gmail.com',
          role_id: 2
        }
        User.create(input)
          .then(user => {
            User.findOne({
              include: [Role],
              where: {
                id: user.id
              }
            })
              .then(user => {
                invalid_token = jwt.sign({
                  id: user.id,
                  email: user.email,
                  username: user.username,
                  role: user.Role
                }, process.env.SECRET)
                request(app)
                  .post('/categories')
                  .send({
                    name: 'Propeller',
                    path: 'propeller',
                  })
                  .set('Authorization', 'Bearer ' + invalid_token)
                  .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('name', 'UNAUTHORIZED')
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.status).toBe(401)
                    done()
                  })
              })
              .catch(err => {
                done(err)
              })
          })
          .catch(err => {
            done(err)
          })
      })

      test('it should return invalid token validation and status 401', (done) => {
        request(app)
          .post('/categories')
          .send({
            name: 'Propeller',
            path: 'propeller',
          })
          .set('Authorization', 'Bearer ' + token + 'a')
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

  describe('Update Category Test', () => {
    describe('Update Category Success', () => {
      test('it should return an updated object category and status 200', (done) => {
        request(app)
          .put('/categories/' + category_id)
          .send({
            name: 'Seal',
            path: 'seal',
          })
          .set('Authorization', 'Bearer ' + token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body.data).toHaveProperty('id', expect.any(Number))
            expect(response.body.data).toHaveProperty('name', 'Seal')
            expect(response.body.data).toHaveProperty('path', 'seal')
            expect(response.body).toHaveProperty('message', 'CATEGORY_UPDATED')
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Update Category Failed', () => {
      test('it should return token existing or not and status 400', (done) => {
        request(app)
          .put('/categories/' + category_id)
          .send({
            name: 'Seal',
            path: 'seal',
          })
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
          .put('/categories/' + category_id)
          .send({
            name: 'Seal',
            path: 'seal',
          })
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

  describe('Delete Category Test', () => {
    describe('Delete Category Success', () => {
      test('it should return a message object when user delete category and status 200', (done) => {
        request(app)
          .delete('/categories/' + category_id)
          .set('Authorization', 'Bearer ' + token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message', 'CATEGORY_DELETED')
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Delete Category Failed', () => {
      test('it should return token existing or not and status 400', (done) => {
        request(app)
          .delete('/categories/' + category_id)
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
          .delete('/categories/' + category_id)
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