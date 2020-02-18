const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User Routes', () => {
   afterAll((done) => {
      queryInterface.bulkDelete('Users', {})
         .then(response => {
            done()
         })
         .catch(err => {
            done(err)
         })
   })

   describe('User Register', () => {
      // ======================================== SUCCESS ====================================================
      test('should return new User object and have status 201', (done) => {
         request(app)
            .post('/users/register')
            .send({
               name: `dummy`,
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, response) => {

               expect(err).toBe(null)
               expect(response.status).toBe(201)
               expect(response.body).toHaveProperty('email', `dummy@dummy.com`)
               expect(response.body).toHaveProperty('password', expect.any(String))
               expect(response.body).toHaveProperty('id', expect.any(Number))
               done()
            })
      })
      // ======================================== FAILED ====================================================

      test('should return error validation if email already in used and have status 400', done => {
         request(app)
            .post('/users/register')
            .send({
               name: `dummy`,
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {

               expect(err).toBe(null)
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('msg', 'email must be unique')
               done()
            })
      })

      test('should return error validation if value must be filled and have status 400', (done) => {
         request(app)
            .post('/users/register')
            .send({
               name: ``,
               email: ``,
               password: ``
            })
            .end((err, res) => {

               expect(err).toBe(null)
               expect(res.status).toBe(400)
               expect(res.body).toHaveProperty('msg', expect.any(Array))
               done()
            })
      })
   })

   describe('User login', () => {
      // ==========================HOOKS=========================================================
      // beforeAll((done) => {
      //    User.create({
      //       name: `dummy`,
      //       email: `dummy@dummy.com`,
      //       password: `12345`
      //    })
      //       .then(data => {
      //          done()
      //       })
      //       .catch(err=> {
      //          console.log(err.message, `ini di hoooooooooooookkkkkkkkk`);

      //          done(err)
      //       })
      // })


      // ======================================== SUCCESS ====================================================
      test('should return token and give status 200', (done) => {
         request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {
               
               expect(err).toBe(null)
               expect(res.status).toBe(200)
               expect(res.body).toHaveProperty('token', expect.any(String))
               done()
            })
      })
      // ======================================== FAILED ===================================================
      test('should return message containning email / password wrong and give status 404', (done) => {
         request(app)
            .post('/users/login')
            .send({
               email: `ahuh@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {               
               expect(err).toBe(null)
               expect(res.status).toBe(404)
               expect(res.body).toHaveProperty('msg', expect.any(String))
               done()
            })
      })
   })
})