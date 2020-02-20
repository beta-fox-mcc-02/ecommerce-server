const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize } = require('../models')
const {queryInterface} = sequelize

describe('Users Routes', () => {
   //HOOKS
   beforeAll(done => {
      const dummyUser = {
         name : "qwerty",
         email : "qwertyu@mail.com",
         password : 'qwertyu',
         RoleId : 2
      }
      User.create(dummyUser)
         .then(user => {
            console.log('success register dummy user')
            done()
         })
         .catch(err => {
            console.log('fail register dummy user')
            done()
         })
   })

   afterAll(done => {
      queryInterface.bulkDelete('Users', {})
         .then(response => {done()})
         .catch(err => done(err))
   })

   
   //REGISTER
   describe('Users Register Test', () => {
      test('Register user success 201', done => {
         request(app)
            .post('/users/register')
            .send({
               name : 'qwerty',
               email : 'd@mail.com',
               password : 'qwerty',
               RoleId : 2
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('access_token', expect.any(String))
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(201)
               done()
            })
      })
      
      test('email already been used', done => {
         request(app)
            .post('/users/register')
            .send({
               name : "qwerty",
               email : "qwertyu@mail.com",
               password : 'qwertyu',
               RoleId : 2
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))

               expect(response.status).toBe(400)
               done()
            })
      })

      test('password length must between 6 and 12 400', done => {
         request(app)
            .post('/users/register')
            .send({
               name: 'qwerty',
               email: 'abcd@mail.com',
               password: 'qw',
               RoleId : 2
            })
            .end((err, response) => {
               // console.log(response)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))

               expect(response.status).toBe(400)
               done()
            })
      })

      test('input cant be empty', done => {
         request(app)
            .post('/users/register')
            .send({
               name : '',
               email : '',
               password : '',
               RoleId : ''
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))

               expect(response.status).toBe(400)
               done()
            })
      })

      test('input cant be null', done => {
         request(app)
            .post('/users/register')
            .send({
               name : null,
               email : null,
               password : null,
               RoleId : null
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))

               expect(response.status).toBe(400)
               done()
            })
      })

      test('wrong format for email', done => {
         request(app)
            .post('/users/register')
            .send({
               name: 'qwerty',
               email: 'abcdmailcom',
               password: 'qwerty',
               RoleId : 2
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })
   })

   // LOGIN
   describe('Users Login Test', () => { 
      test.only('User login success 200', done => {
         request(app)
            .post('/users/login')
            .send({
               email : "qwertyu@mail.com",
               password : 'qwertyu'
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('access_token', expect.any(String))
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(200)
               done()
            })
      })

      test('Wrong username/password', done => {
         request(app)
            .post('/users/login')
            .send({
               email : "qwertyu@mail.com",
               password : 'qwertyqwewu'
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('input cant be empty', done => {
         request(app)
            .post('/users/login')
            .send({
               email : '',
               password : ''
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })

      test('wrong format for email', done => {
         request(app)
            .post('/users/login')
            .send({
               email : 'abcmail.com',
               password : 'qwerty'
            })
            .end((err, response) => {
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(String))
               expect(response.status).toBe(400)
               done()
            })
      })
   })
})
