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
                // console.log(response.body)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(Array))
               expect(response.body.msg[0]).toHaveProperty('message', 'email must be unique')

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
              //  console.log(response.body)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(Array))
               expect(response.body.msg[0]).toHaveProperty('message', 'password length must be between 6 and 12')
               expect(response.status).toBe(400)
               done()
            })
      })

      test('name cant be empty', done => {
        request(app)
           .post('/users/register')
           .send({
              name : '',
              email : 'acbdefg@mail.com',
              password : 'qwerty',
              RoleId : 2
           })
           .end((err, response) => {
              // console.log(response.body)
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(Array))
              expect(response.body.msg[0]).toHaveProperty('message', 'name cant be empty')
              expect(response.body.msg[1]).toHaveProperty('message', 'name must contain character only')
              expect(response.status).toBe(400)
              done()
           })
     })

     test('email cant be empty', done => {
      request(app)
         .post('/users/register')
         .send({
            name : 'abcdef',
            email : '',
            password : 'qwerty',
            RoleId : 2
         })
         .end((err, response) => {
            // console.log(response.body)
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('msg', expect.any(Array))
            expect(response.body.msg[0]).toHaveProperty('message', 'please use email format')
            expect(response.body.msg[1]).toHaveProperty('message', 'email cant be empty')
            expect(response.status).toBe(400)
            done()
         })
      })

      test('password cant be empty', done => {
        request(app)
           .post('/users/register')
           .send({
              name : 'abcdef',
              email : 'acbdefg@mail.com',
              password : '',
              RoleId : 2
           })
           .end((err, response) => {
              // console.log(response.body)
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(Array))
              expect(response.body.msg[0]).toHaveProperty('message', 'password length must be between 6 and 12')
              expect(response.body.msg[1]).toHaveProperty('message', 'password must only contain alpha and numeric')
              expect(response.body.msg[2]).toHaveProperty('message', 'password cant be empty')
              expect(response.status).toBe(400)
              done()
           })
      })

      test('Role cant be empty', done => {
        request(app)
           .post('/users/register')
           .send({
              name : 'abcdef',
              email : 'acbdefg@mail.com',
              password : 'qwerty',
              RoleId : ''
           })
           .end((err, response) => {
              // console.log(response.body)
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(Array))
              expect(response.body.msg[0]).toHaveProperty('message', 'role must only contain number')
              expect(response.body.msg[1]).toHaveProperty('message', 'role cant be empty')
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
              //  console.log(response.body)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(Array))
               expect(response.body.msg[0]).toHaveProperty('message', 'name cant be empty')
               expect(response.body.msg[1]).toHaveProperty('message', 'name must contain character only')
               expect(response.body.msg[2]).toHaveProperty('message', 'please use email format')
               expect(response.body.msg[3]).toHaveProperty('message', 'email cant be empty')
               expect(response.body.msg[4]).toHaveProperty('message', 'password length must be between 6 and 12')
               expect(response.body.msg[5]).toHaveProperty('message', 'password must only contain alpha and numeric')
               expect(response.body.msg[6]).toHaveProperty('message', 'password cant be empty')
               expect(response.body.msg[7]).toHaveProperty('message', 'role must only contain number')
               expect(response.body.msg[8]).toHaveProperty('message', 'role cant be empty')
               expect(response.status).toBe(400)
               expect(response.status).toBe(400)
               done()
            })
      })

      test('name cant be null', done => {
        request(app)
           .post('/users/register')
           .send({
              name : null,
              email : 'abcd@mail.com',
              password : '98765',
              RoleId : 2
           })
           .end((err, response) => {
              // console.log(response.body)
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(Array))
              expect(response.body.msg[0]).toHaveProperty('message', 'name cant be null')
              expect(response.status).toBe(400)
              done()
           })
      })

      test('email cant be null', done => {
        request(app)
           .post('/users/register')
           .send({
              name : 'abcdef',
              email : null,
              password : '98765',
              RoleId : 2
           })
           .end((err, response) => {
              // console.log(response.body)
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(Array))
              expect(response.body.msg[0]).toHaveProperty('message', 'email cant be null')
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
              //  console.log(response.body)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(Array))
               expect(response.body.msg[0]).toHaveProperty('message', 'name cant be null')
               expect(response.body.msg[1]).toHaveProperty('message', 'email cant be null')
               expect(response.body.msg[2]).toHaveProperty('message', 'password cant be null')
               expect(response.body.msg[3]).toHaveProperty('message', 'role cant be null')
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
              //  console.log(response.body)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', expect.any(Array))
               expect(response.body.msg[0]).toHaveProperty('message', 'please use email format')
               expect(response.status).toBe(400)
               done()
            })
      })
   })

   // LOGIN
   describe('Users Login Test', () => { 
      test('User login success 200', done => {
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
              //  console.log(response.body)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', 'wrong username/password')
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
              //  console.log(response.body)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', 'wrong username/password')
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
              //  console.log(response.body)
               expect(err).toBe(null)
               expect(response.body).toHaveProperty('msg', 'msg', 'wrong username/password')
               expect(response.status).toBe(400)
               done()
            })
      })
   })
})
