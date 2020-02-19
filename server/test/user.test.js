const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

describe('users routes', () => {
  //deleting all input to database
  afterAll(done => {
    User.destroy({
      where: {}
    })
      .then(() => done())
      .catch(err => done(err))
  })

  //create a dummy user
  beforeAll((done) => {
    User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: '123',
      role: true
    })
      .then(() => done())
      .catch(err => done(err))
  })
  
  describe('users login', () => {
    describe('login success', () => {
  
      test("It should returns an access token and user's username. It has status code of 200", done => {
        request(app)
          .post('/users')
          .send({
            user: 'admin',
            password: '123'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('token', expect.any(String))
            expect(response.body).toHaveProperty('username', 'admin')
            done()
          })
      })
    })

    describe('login failure', () => {
      test("It should return an array of errors with status 400", done => {
        request(app)
          .post('/users')
          .send({
            user: 'nimda',
            password: '321'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('errors', expect.arrayContaining(["Wrong username / email / password"]))
            done()
          })
      })
    })
  })

  describe('users register', () => {
    describe('register successful', () => {
      test('It should return a message that inform successful register with status code 201', done => {
        request(app)
          .post('/users/register')
          .send({
            username: 'adminBaru',
            email: 'admin@baru.com',
            password: '123',
            role: true
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('message', "Register successful")
            done()
          })
      })
    })

    describe('register fail email wrong format', () => {
      test("It should return a message that tells wrong email format with status 400", done => {
        request(app)
          .post('/users/register')
          .send({
            username: 'adminCoba',
            email: 'salahEmail',
            password: '123',
            role: true
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('errors', expect.arrayContaining(["Wrong email format"]))
            done()
          })
      })
    })

    describe('register fail email used', () => {
      test("It should return a message that tells email already used with status 400", done => {
        request(app)
          .post('/users/register')
          .send({
            username: 'adminCoba',
            email: 'admin@admin.com',
            password: '123',
            role: true
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('errors', expect.arrayContaining(["email must be unique"]))
            done()
          })
      })
    })

    describe('register fail email empty', () => {
      test("It should return a message that tells email empty used with status 400", done => {
        request(app)
          .post('/users/register')
          .send({
            username: 'adminCoba',
            email: '',
            password: '123',
            role: true
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('errors', expect.arrayContaining(["Email cannot be empty"]))
            done()
          })
      })
    })

    describe('register fail password empty', () => {
      test("It should return a message that tells password empty used with status 400", done => {
        request(app)
          .post('/users/register')
          .send({
            username: 'adminCoba',
            email: 'oke@oke.com',
            password: '',
            role: true
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('errors', expect.arrayContaining(["Password cannot be empty"]))
            done()
          })
      })
    })
  })
})


