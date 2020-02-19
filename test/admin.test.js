const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Admin Routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Admins', {})
        .then(response => {
          done()
        })
        .catch(err => done(err))
    })

    beforeAll((done) => {
        queryInterface.bulkDelete('Admins', {})
        .then(response => {
          done()
        })
        .catch(err => done(err))
    })
    
    describe('Admin Register Test', () => {

        test('It should return new admin object and status 201', (done) => {
            request(app)
                .post('/admins/register')
                .send({
                    name : "Hikmani Syariful Fajar",
                    email : "syariful@gmail.com",
                    password : "12345678"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('name')
                    expect(response.body).toHaveProperty('email')
                    expect(response.body.password).not.toBe('12345678')
                    expect(response.status).toBe(201)
                    done()
                })
        })

        test('It should return error messages from SequelizeValidationError and status 400', (done) => {
            request(app)
                .post('/admins/register')
                .send({
                    name : "",
                    email : "syariful.com",
                    password : "1234"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('errors')
                    expect(response.status).toBe(400)
                    done()
                })
        })

        test('It should return error message from SequelizeUniqueConstraintError and status 400', (done) => {
            request(app)
                .post('/admins/register')
                .send({
                    name : "Ipul",
                    email : "syariful@gmail.com",
                    password : "12345678"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error')
                    expect(response.status).toBe(400)
                    done()
                })
        })
    })

    describe('Admin login Test', () => {

        test("It should return object containing access_token and status 200", (done) => {
            request(app)
                .post('/admins/login')
                .send({
                    email : "syariful@gmail.com",
                    password : "12345678",
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('access_token')
                    expect(response.status).toBe(200)
                    done()
                })
        })

        test("It should return object containing error message : email incorrectly and status 400", (done) => {
            request(app)
                .post('/admins/login')
                .send({
                    email : "syariful017@gmail.com",
                    password : "12345678"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body.message).toBe('BAD REQUEST')
                    expect(response.body).toHaveProperty('error')
                    expect(response.status).toBe(400)
                    done()
                })
        })

        test("It should return object containing error message : password incorrectly and status 400", (done) => {
            request(app)
                .post('/admins/login')
                .send({
                    email : "syariful@gmail.com",
                    password : "12345"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body.message).toBe('BAD REQUEST')
                    expect(response.body).toHaveProperty('error')
                    expect(response.status).toBe(400)
                    done()
                })
        })
    })

})