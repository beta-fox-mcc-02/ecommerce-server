const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User Routes', () => {
    beforeEach((done) => {
        User.create({
            first_name: "Dadang",
            last_name: "Kardun",
            address: "Bandung",
            email: "dadang@mail.com",
            password: "inipassword",
        })
            .then(user => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterEach((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('User routes for register', () => {
        describe('User Routes success', () =>{
            test('return new user object and status 201', (done) => {
                request(app)
                    .post('/register')
                    .send({
                        first_name: "Djalal",
                        last_name: "Kurnia",
                        address: "Bandung",
                        email: "dk@mail.com",
                        password: "inipassword"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('first_name', expect.any(String))
                        expect(response.body).toHaveProperty('last_name', expect.any(String))
                        expect(response.body).toHaveProperty('email', expect.any(String))
                        expect(response.body).toHaveProperty('address', expect.any(String))
                        expect(response.body).toHaveProperty('msg', 'Register success')
                        expect(response.status).toBe(201)
                        done()                    
                    })
            })
        })
    
        describe('User Routes Failed', () => {
            describe('error for email must be true', () => {
                test('return message error and status error', (done) => {
                    request(app)
                        .post('/register')
                        .send({
                            first_name: "Djalal",
                            last_name: "Kurnia",
                            address: "Bandung",
                            email: "dkmailcom",
                            password: "inipassword",
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['wrong format email']))
                            expect(response.status).toBe(400)
                            done()
                        })
                })
            })
    
            describe('error for email minimum password length 8', () => {
                test('return message error and status error', (done)=> {
                    request(app)
                        .post('/register')
                        .send({
                            first_name: "Djalal",
                            last_name: "Kurnia",
                            address: "Bandung",
                            email: "dk@mail.com",
                            password: "pass",
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['minimum password length 8']))
                            expect(response.status).toBe(400)
                            done()
                        })
                })
            })

            describe('error for first_name, address, email, password', () => {
                test('return message error and status error', (done) => {
                    request(app)
                        .post('/register')
                        .send({
                            first_name: null,
                            last_name: "Kurnia",
                            address: null,
                            email: null,
                            password: null,
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required address', 'required first name', 'required email', 'required password']))
                            expect(response.status).toBe(400)
                            done()
                        })
                })
            })

            describe('error for first_name null', () => {
                test('return message error and status error', (done) => {
                    request(app)
                        .post('/register')
                        .send({
                            first_name: null,
                            last_name: "Kurnia",
                            address:"jakarta",
                            email: "dk@mail.com",
                            password: "inipassword",
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required first name']))
                            expect(response.status).toBe(400)
                            done()
                        })
                })
            })

            describe('error for address null', () => {
                test('return message error and status error', (done) => {
                    request(app)
                        .post('/register')
                        .send({
                            first_name: "Djalal",
                            last_name: "Kurnia",
                            address: null,
                            email: "dk@mail.com",
                            password: "ini password",
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required address']))
                            expect(response.status).toBe(400)
                            done()
                        })
                })
            })

            describe('error for email null', () => {
                test('return message error and status error', (done) => {
                    request(app)
                        .post('/register')
                        .send({
                            first_name: "Djalal",
                            last_name: "Kurnia",
                            address: "Bandung",
                            email: null,
                            password: "inipassword",
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required email']))
                            expect(response.status).toBe(400)
                            done()
                        })
                })
            })

            describe('error for password null', () => {
                test('return message error and status error', (done) => {
                    request(app)
                        .post('/register')
                        .send({
                            first_name: "Djalal",
                            last_name: "Kurnia",
                            address: "Bandung",
                            email: "dk@mail.com",
                            password: null,
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required password']))
                            expect(response.status).toBe(400)
                            done()
                        })
                })
            })

            describe('error for email not unique', () => {
                test('return message error and status error', (done) => {
                    request(app)
                        .post('/register')
                        .send({
                            first_name: "Dadang",
                            last_name: "Kardun",
                            address: "Bandung",
                            email: "dadang@mail.com",
                            password: "inipassword",
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['email has been declared another user']))
                            expect(response.status).toBe(400)                         
                            done()
                        })
                })
            })
        })

    })

    describe('User login', () => {
        describe('success login', () => {
            test('user success login', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: "dadang@mail.com",
                        password: "inipassword"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('msg', 'success login')
                        expect(response.body).toHaveProperty('token', expect.any(String))
                        expect(response.status).toBe(200)
                        done()
                    })
            })
        })

        describe('login fail', () => {
            test('user wrong email', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: "salah@mail.com",
                        password: "inipassword"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('msg', 'Invalid Email')
                        expect(response.status).toBe(400)
                        done()
                    })
            })

            test('user password wrong', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: "dadang@mail.com",
                        password: "wrongpassword"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('msg', 'Invalid Password')
                        expect(response.status).toBe(400)
                        done()
                    })
            })

        })
    })
})