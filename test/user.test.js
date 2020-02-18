const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User Routes', () => {
  afterAll((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(response => {
        done()
      }).catch(err => done(err))
  })

  describe('User Register Test', () => {
    test('it should return new user object and status 201', (done) => {
      request(app)
        .post('/user/register')
        .send({
          name: 'ad',
          email: 'd@mail.com',
          password: '123456'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('token', expect.any(String))
          expect(response.body).toHaveProperty('name', 'ad')
          expect(response.status).toBe(201)
          done()
        })
    })

  })

  describe('User Register fail', () => {
    test('it should return error name, email, password cannot be empty', (done) => {
      request(app)
        .post('/user/register')
        .send({
          name: '',
          email: 'a@mail.com',
          password: ''
        })
        .end((err, response) => {
          expect(err).toBe(null)
          // console.log(response.body, 'ini bodynyaa +_+_++_');
          expect(response.body).toHaveProperty('message', expect.any(String))
          expect(response.body).toHaveProperty('errors', expect.arrayContaining(['name is required',
          'Password is required']))
          expect(response.status).toBe(400)
          done()
        })
    })

  })

  describe('User Register fail', () => {
    let expected = 'email has taken'
    test('it should return error email has taken', (done) => {
      request(app)
        .post('/user/register')
        .send({
          name: 'ad',
          email: 'd@mail.com',
          password: '123456'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          // console.log(response.body, 'ini bodynyaa +_+_++_');
          expect(response.body).toHaveProperty('message', expect.any(String))
          expect(response.body).toHaveProperty('errors', expect.arrayContaining(['email has taken']))
          expect(response.status).toBe(400)
          done()
        })
    })

  })

  describe('User Register fail', () => {
    test('it should return error format email wrong and password is les than 6 characters', (done) => {
      request(app)
        .post('/user/register')
        .send({
          name: 'ad',
          email: 'gmail.com',
          password: '12345'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          // console.log(response.body, 'ini bodynyaa +_+_++_');
          expect(response.body).toHaveProperty('message', expect.any(String))
          expect(response.body).toHaveProperty('errors', expect.arrayContaining(['Password minimal 6 characters', 'Validation isEmail on email failed']))
          expect(response.status).toBe(400)
          done()
        })
    })

  })

  describe('user login success', () =>{
    test('return token and name', (done) =>{
      request(app)
        .post('/user/login')
        .send({
          email: 'd@mail.com',
          password: '123456'
        })
        .end((err, res) =>{
          // console.log(res.body, 'ini bodynyaa +_+_++_');
          expect(err).toBe(null)
          expect(res.body).toHaveProperty('token', expect.any(String))
          expect(res.body).toHaveProperty('name', 'ad')
          expect(res.status).toBe(201)
          done()
        })
    })
  })

  describe('user login fail', () =>{
    test('return error wrong username/password', (done) =>{
      request(app)
        .post('/user/login')
        .send({
          email: 'z@mail.com',
          password: '123456'
        })
        .end((err, res) =>{
          // console.log(res.body, 'ini bodynyaa +_+_++_');
          expect(err).toBe(null)
          expect(res.body).toHaveProperty('message', 'wrong password/email')
          // expect(res.body).toBe('wrong password/email')
          expect(res.status).toBe(404)
          done()
        })
    })
  })


})
