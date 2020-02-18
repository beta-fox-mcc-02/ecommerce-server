const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const queryInterface = sequelize

describe('users routes', () => {
  afterAll(done => {
    queryInterface.bulkDelete('Users', {})
      .then(() => done())
      .catch(err => done(err))
  })

  describe('users login', () => {

    // describe('login error', () => {
  
    // })
  
    describe('login success', () => {
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
  
      test("It should returns an access token and user's username. It has status code of 200", (done) => {
        request(app)
          .post('/users')
          .send({
            user: 'admin',
            password: '123'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('token', expect.any(String))
            expect(response.body).toHaveProperty('username', 'admin')
            done()
          })
      })
    })
  })
})


