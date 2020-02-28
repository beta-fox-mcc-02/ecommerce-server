const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

// user
describe('user testing', () => {

    beforeAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('sign up testing', () => {
        describe('sign up success test', () => {
            test('it sould return status 201 and new user object', (done) => {
                request(app)
                    .post('/users/signUp')
                    .send({
                        email: 'user@mail.com',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('payload', expect.any(Object))
                        done()
                    })
            })
        })

        describe('sign up error test', () => {
            test('email format validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/users/signUp')
                    .send({
                        email: 'user',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('password length validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/users/signUp')
                    .send({
                        email: 'user@mail.com',
                        password: '12345'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('unique email validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/users/signUp')
                    .send({
                        email: 'user@mail.com',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('email notNull validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/users/signUp')
                    .send({
                        email: '',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('password notNull validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/users/signUp')
                    .send({
                        email: 'user@mail.com',
                        password: ''
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })
        })
    })

    describe('sign in testing', () => {
        describe('sign in success test', () => {
            test('it sould return status 200 and data object', (done) => {
                request(app)
                    .post('/users/signIn')
                    .send({
                        email: 'user@mail.com',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('token', expect.any(String))
                        done()
                    })
            })
        })

        describe('sign in error test', () => {
            test('invalid email or password: it sould return status 400 and data object', (done) => {
                request(app)
                    .post('/users/signIn')
                    .send({
                        email: 'use@mail.com',
                        password: '12345'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('email notNull validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/users/signUp')
                    .send({
                        email: '',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('password notNull validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/users/signUp')
                    .send({
                        email: 'user@mail.com',
                        password: ''
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })
        })
    })
})


// admin
describe('admin testing', () => {

    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('sign up testing', () => {
        describe('sign up success test', () => {
            test('it sould return status 201 and new admin object', (done) => {
                request(app)
                    .post('/admins/signUp')
                    .send({
                        email: 'admin@mail.com',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('payload', expect.any(Object))
                        done()
                    })
            })
        })

        describe('sign up error test', () => {
            test('email format validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/admins/signUp')
                    .send({
                        email: 'admin',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('password length validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/admins/signUp')
                    .send({
                        email: 'admin@mail.com',
                        password: '12345'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('unique email validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/admins/signUp')
                    .send({
                        email: 'admin@mail.com',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('email notNull validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/admins/signUp')
                    .send({
                        email: '',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('password notNull validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/admins/signUp')
                    .send({
                        email: 'admin@mail.com',
                        password: ''
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })
        })
    })

    describe('sign in testing', () => {
        describe('sign in success test', () => {
            test('it sould return status 200 and data object', (done) => {
                request(app)
                    .post('/admins/signIn')
                    .send({
                        email: 'admin@mail.com',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('token', expect.any(String))
                        done()
                    })
            })
        })

        describe('sign in error test', () => {
            test('invalid email or password: it sould return status 400 and data object', (done) => {
                request(app)
                    .post('/users/signIn')
                    .send({
                        email: 'admi@mail.com',
                        password: '12345'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('email notNull validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/admins/signUp')
                    .send({
                        email: '',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('password notNull validation: it sould return status 400 and error object', (done) => {
                request(app)
                    .post('/admins/signUp')
                    .send({
                        email: 'admin@mail.com',
                        password: ''
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })
        })
    })
})