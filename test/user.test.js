const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User test section', () => {

    beforeAll((done) => {

        User.create({
            username: "jajang",
            email: "jajang@mail.com",
            password: "12345"
        })
            .then(data => done())
            .catch(err => done(err))

    })

    afterAll((done) => {

        queryInterface.bulkDelete('Users', {})
            .then(response => {
                done()
            })
            .catch(err => done(err))

    })

    describe('Register test section', () => {

        describe('Register success response', () => {

            test('Register success response and will returning status code 201 and data user', (done) => {

                request(app)
                    .post('/register')
                    .send({
                        username: "admin",
                        email: "admin@mail.com",
                        password: "12345"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(201)
                        expect(response.body.data).toHaveProperty('username', (expect.anything()))
                        expect(response.body.data).toHaveProperty('email', (expect.anything()))
                        expect(response.body.data).toHaveProperty('password', (expect.anything()))
                        expect(response.body.data).toHaveProperty('role', false)
                        expect(response.body.data.email).toContain('@')
                        expect(response.body.data.email).toContain('mail.com')
                        expect(response.body.message).toContain('success create')
                        done()
                    })

            })

        })

        describe('Register failed response', () => {

            test('Register error response because username empty', (done) => {

                request(app)
                    .post('/register')
                    .send({
                        username: "",
                        email: "admin@mail.com",
                        password: "12345"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'username cant be empty')
                        done()
                    })

            })

            test('Register error response because email not contain email format', (done) => {

                request(app)
                    .post('/register')
                    .send({
                        username: "admin",
                        email: "admin@mailcom",
                        password: "12345"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'your email must contain email format')
                        done()
                    })

            })

            test('Register error response because email already in use', (done) => {

                request(app)
                    .post('/register')
                    .send({
                        username: "jajang",
                        email: "jajang@mail.com",
                        password: "12345"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'email already in use')
                        done()
                    })

            })

            test('Register error response because email empty', (done) => {

                request(app)
                    .post('/register')
                    .send({
                        username: "admin",
                        email: "",
                        password: "12345"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'email cant be empty')
                        done()
                    })

            })

            test('Register error response because password length less than 5 character', (done) => {

                request(app)
                    .post('/register')
                    .send({
                        username: "admin",
                        email: "admin@mail.com",
                        password: "1234"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'password length cannot less than 5')
                        done()
                    })

            })

        })

    })

    describe('Login test section', () => {
        
        beforeAll((done) => {

            User.create({
                username: "ujang",
                email: "ujang@mail.com",
                password: "12345"
            })
                .then(data => done())
                .catch(err => done(err))
    
        })

        describe('Login success response', () => {

            test('Login success response and will returning status code 200 and token', (done) => {

                request(app)
                    .post('/login')
                    .send({
                        email: "ujang@mail.com",
                        password: "12345"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('token', (expect.anything()))
                        expect(response.body).toHaveProperty('message', 'success login')
                        done()
                    })

            })

        })

        describe('Login fail response', () => {

            test('Login error response because email not match', (done) => {

                request(app)
                    .post('/login')
                    .send({
                        email: "ujan@mail.com",
                        password: "12345"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'email not found')
                        done()
                    })

            })

            test('Login error response because password not match', (done) => {

                request(app)
                    .post('/login')
                    .send({
                        email: "ujang@mail.com",
                        password: "1234"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'invalid password / email')
                        done()
                    })

            })

        })

    })

})