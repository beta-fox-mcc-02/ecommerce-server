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
         })
         .catch(err => {
            done(err)
         })
   })

   describe('User Register', () => {
      test('should return new User object and have status 201', (done) => {
         request(app)
            .post('/users/register')
            .send({
               name: `dummy`,
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, response) => {
               console.log(response.body, `ini response.bodyyyyyyyyyyyyyyyyy`);

               expect(err).toBe(null)
               expect(response.status).toBe(201)
               expect(response.body).toHaveProperty('email', `dummy@dummy.com`)
               expect(response.body).toHaveProperty('password', expect.any(String))
               expect(response.body).toHaveProperty('id', expect.any(Number))
               done()
            })
      })
   })

   
})