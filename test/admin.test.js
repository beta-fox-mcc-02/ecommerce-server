const app = require('../app')
const request = require('supertest')
const { sequelize: { queryInterface } } = require('../models')
let token

describe('Admin Routes', () => {

  afterAll((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(response => {
        done()
      }).catch(err => done(err))
  })

  describe('Admin Register Test', () => {

    describe('Admin Register Success', () => {
      test('it should return new object includes email, username, and id and status 201  ', (done) => {
        request(app)
          .post('/admin')
          .send({
            first_name: 'Budi',
            username: 'budiagung',
            password: 'agung2010',
            email: 'budiagung@gmail.com',
            role_id: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('id', expect.any(Number))
            expect(response.body).toHaveProperty('username', 'budiagung')
            expect(response.body).toHaveProperty('email', 'budiagung@gmail.com')
            expect(response.body).toHaveProperty('message', 'USER_CREATED')
            expect(response.status).toBe(201)
            done()
          })
      })
    })

    describe('Admin Register Failed', () => {
      test('it should return input error and status 400', (done) => {
        const input = {
          first_name: '',
          username: 'budiagung',
          password: '',
          phone_number: '0812',
          email: 'budiagung@gmail.com',
          role_id: 1
        }
        request(app)
          .post('/admin')
          .send(input)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'BAD REQUEST')
            expect(response.body).toHaveProperty('message', 'INPUT_ERROR')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors.length).toBeGreaterThan(0)
            expect(response.status).toBe(400)
            done()
          })
      })

      test('it should return duplicate email error and status 400', (done) => {
        const input = {
          first_name: 'Budi',
          username: 'budiagung',
          password: '12345qwerty',
          phone_number: '081289073980',
          email: 'budiagung@gmail.com',
          role_id: 1
        }
        request(app)
          .post('/admin')
          .send(input)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'BAD REQUEST')
            expect(response.body).toHaveProperty('message', 'UNIQUE_VALIDATION')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors[0]).toBe('email must be unique')
            expect(response.body.errors.length).toBeGreaterThan(0)
            expect(response.status).toBe(400)
            done()
          })
      })

      test('it should return duplicate username error and status 400', (done) => {
        const input = {
          first_name: 'Budi',
          username: 'budiagung',
          password: '12345qwerty',
          phone_number: '081289073980',
          email: 'budi@gmail.com',
          role_id: 2
        }
        request(app)
          .post('/admin')
          .send(input)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'BAD REQUEST')
            expect(response.body).toHaveProperty('message', 'UNIQUE_VALIDATION')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors[0]).toBe('username must be unique')
            expect(response.body.errors.length).toBeGreaterThan(0)
            expect(response.status).toBe(400)
            done()
          })
      })
    })

  })

  describe('Admin Login Test', () => {

    describe('Admin Login Success', () => {
      test('it should return access token, message and status 200 ', (done) => {
        request(app)
          .post('/admin/login')
          .send({
            email: 'budiagung@gmail.com',
            password: 'agung2010'
          })
          .end((err, response) => {
            token = response.body.token
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('token', expect.any(String))
            expect(response.body).toHaveProperty('message', 'LOGIN_SUCCESS')
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Admin Login Failed', () => {
      test('it should return login failed error and status 400', (done) => {
        const input = {
          email: 'admin@admin.com',
          password: 'rootabc'
        }
        request(app)
          .post('/admin/login')
          .send(input)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name', 'BAD REQUEST')
            expect(response.body).toHaveProperty('message', 'LOGIN_FAILED')
            expect(response.body).toHaveProperty('error', 'Email / password is incorrect')
            expect(response.status).toBe(400)
            done()
          })
      })
    })

  })

  describe('Find One Admin Test', () => {
    describe('Find One Admin Success', () => {
      it('should return a user object and status 200', (done) => {
        request(app)
        .get('/admin')
        .set('Authorization','Bearer '+token)
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('id', expect.any(Number))
          expect(response.body).toHaveProperty('username', 'budiagung')
          expect(response.body).toHaveProperty('email','budiagung@gmail.com')
          expect(response.status).toBe(200)
          done()
        })
      })
    })

    describe('Find One Admin Failed', () => {
      it('should return error token existing or not and status 400' ,(done) => {
        request(app)
        .get('/admin')
        .set('Authorization','Bearer ')
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('name', 'BAD REQUEST')
          expect(response.body).toHaveProperty('message', 'LOGIN_FAILED')
          expect(response.body).toHaveProperty('error', expect.any(String))
          expect(response.status).toBe(400)
          done()
        })
      })

      it('should return error token validation and status 401', (done) => {
        request(app)
        .get('/admin')
        .set('Authorization','Bearer '+token +'a')
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