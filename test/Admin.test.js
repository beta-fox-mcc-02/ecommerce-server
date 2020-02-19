const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { Administrator, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Administrator Routes', () => {
  beforeAll((done) => {
    queryInterface.bulkDelete('Administrators', {})
      .then(response => {
        done()
      })
      .catch(err => done(err))
  })

  describe('Admin Register Test', () => {
    test('it should return new user object and status 201', (done) => {
      request(app)
        .post('/admins/register')
        .send({
          username: 'agron',
          email: 'agron@mail.com',
          password: 'sixcharacters'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('email', 'agron@mail.com')
          expect(response.body).toHaveProperty('password', expect.any(String))
          expect(response.body).toHaveProperty('id', expect.any(Number))
          expect(response.status).toBe(201)
          done()
        })
    })
    test('it should fail when email format is invalid with status code 400', (done) => {
      request(app)
        .post('/admins/register')
        .send({
          username: 'agron',
          email: 'agronmail.com',
          password: 'threethousand'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('errors', expect.any(Array))
          expect(response.body.errors[0]).toBe('Please enter a valid email address')
          expect(response.body.errors).toHaveLength(1)
          expect(response.status).toBe(400)
          done()
        })
    })
    test('it should fail when email format is invalid and password length is less than 6, with status code 400', (done) => {
      request(app)
        .post('/admins/register')
        .send({
          username: 'agron',
          email: 'agronmail.com',
          password: '3000'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('errors', expect.any(Array))
          expect(response.body.errors).toEqual(expect.arrayContaining(['Please enter a valid email address', "Password's minimal length is 6 characters"]))
          expect(response.status).toBe(400)
          done()
        })
    })
    test('it should fail when email already exists in database with status code 400', (done) => {
      request(app)
        .post('/admins/register')
        .send({
          username: 'agron',
          email: 'agron@mail.com',
          password: 'threethousand'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('errors', expect.any(Array))
          expect(response.body.errors[0]).toBe('Email address has already been registered')
          expect(response.body.errors).toHaveLength(1)
          expect(response.status).toBe(400)
          done()
        })
    })
  })

  // ======================L    O    G    I    N===============================//
  describe('Admin Login Test', () => {
    test('it should return access_token and status 200', (done) => {
      request(app)
        .post('/admins/login')
        .send({
          email: 'agron@mail.com',
          password: 'sixcharacters'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body.access_token).toEqual(expect.any(String))
          expect(response.status).toBe(200)
          done()
        })
    })

    test('it should return an error when password is incorrect with status 400', (done) => {
      request(app)
        .post('/admins/login')
        .send({
          email: 'agron@mail.com',
          password: 'gelato'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', 'Invalid email / password')
          expect(response.status).toBe(400)
          done()
        })
    })
  })
})