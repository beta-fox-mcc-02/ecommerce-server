const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User Routes', () => {
  beforeEach((done) => {
    User.create({
      email: 'bau@mail.com',
      password: '123456',
      role: 'admin'
    })
      .then(result => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterEach((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(result => {
        done()
      }).catch(err => {
        done(err)
      })
  })

  describe('User Register Test', () => {
    describe('User Register Success', () => {
      test('it should return access token and status 201', (done) => {
        request(app)
          .post('/register')
          .send({
            email: 'hardim@mail.com',
            password: '123456',
            role: 'admin'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('access_token', expect.any(String))
            expect(response.status).toBe(201)
            done()
          })
      })
    })

    describe('User Register Fails', () => {
      describe('Fail in Email', () => {
        test('it should return msg bad request with error email cannot null and status 400', (done) => {
          request(app)
            .post('/register')
            .send({
              email: null,
              password: '123456',
              role: 'admin'
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('errors', ["email cannot be null"])
              expect(response.body).toHaveProperty('msg', "Bad Request")
              expect(response.status).toBe(400)
              done()
            })
        })

        test('it should return msg Bad Request with error invalid email and status 400', (done) => {
          request(app)
            .post('/register')
            .send({
              email: 'bau@mail',
              password: '123456',
              role: 'admin'
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('errors', ["invalid email"])
              expect(response.body).toHaveProperty('msg', "Bad Request")
              expect(response.status).toBe(400)
              done()
            })
        })

        test('it should return msg bad reques with error email already and status 400', (done) => {
          request(app)
            .post('/register')
            .send({
              email: 'bau@mail.com',
              password: '123456',
              role: 'admin'
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', "Email already registered")
              expect(response.body).toHaveProperty('msg', "Bad Request")
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('Fail in Password', () => {
        test('it should return msg bad request with error password cannot null and status 400', (done) => {
          request(app)
            .post('/register')
            .send({
              email: 'bau@mail.com',
              password: null,
              role: 'admin'
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('errors', ["password cannot be null"])
              expect(response.body).toHaveProperty('msg', "Bad Request")
              expect(response.status).toBe(400)
              done()
            })
        })

        test('it should return errors with msg Bad Request and status 400', (done) => {
          request(app)
            .post('/register')
            .send({
              email: 'bau@mail.com',
              password: '123',
              role: 'admin'
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('errors', ["password minimal length is 6"])
              expect(response.body).toHaveProperty('msg', "Bad Request")
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('Fail in role', () => {
        test('it should return error with msg bad request and status 400', (done) => {
          request(app)
            .post('/register')
            .send({
              email: 'bau@mail.com',
              password: '123456'
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('errors', ["role cannot be null"])
              expect(response.body).toHaveProperty('msg', "Bad Request")
              expect(response.status).toBe(400)
              done()
            })
        })

        test('it should return error and status 400', (done) => {
          request(app)
            .post('/register')
            .send({
              email: 'bau@mail.com',
              password: '123456',
              role: ""
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('errors', ["role is only for user and admin"])
              expect(response.body).toHaveProperty('msg', "Bad Request")
              expect(response.status).toBe(400)
              done()
            })
        })
      })
    })
  })

  describe('Login Test', () => {
    describe('login success', () => {
      test('it should return access token and status 201', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'bau@mail.com',
            password: '123456'
          })
          .end((err, response) => {
            console.log(response.body);

            expect(err).toBe(null)
            expect(response.body).toHaveProperty('access_token', expect.any(String))
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('login fail', () => {
      test('it should return msg bad request with error invalid email/password', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'bauasa@mail.com',
            password: '123456'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('error', "invalid email/password")
            expect(response.body).toHaveProperty('msg', "Bad Request")
            expect(response.status).toBe(400)
            done()
          })
      })

      test('it should return msg bad request with error invalid email/password', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'bauasa@mail.com',
            password: '123sa456'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('error', "invalid email/password")
            expect(response.body).toHaveProperty('msg', "Bad Request")
            expect(response.status).toBe(400)
            done()
          })
      })
    })
  })
})
