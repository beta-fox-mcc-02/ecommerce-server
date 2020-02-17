const app = require('../app')
const request = require('supertest')
const Sequelize = require('sequelize')
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize

describe('User Router Test', () => {
    beforeAll((done) => {
        User.create({
            name: 'dadday',
            email: 'dadday@day.com',
            password: '123456789',
            role: 'user'
        })
        .then(result => {
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(result => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    describe('User Register Test', () => {
        describe('Register Success Response', () => {
            test('it should be response status 201 and response user data, excluded password', (done) => {
                request(app)
                    .post('/register/user')
                    .send({
                        name: 'dimas',
                        email: 'dimas@day.com',
                        password: 'dimas123'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('msg', 'user registered successfully')
                        expect(response.body).toHaveProperty('data.id', expect.any(Number))
                        expect(response.body).toHaveProperty('data.name', expect.any(String))
                        expect(response.body).toHaveProperty('data.email', expect.stringMatching(/[@.com|co]/))
                        expect(response.body).not.toHaveProperty('data.password')
                        expect(response.body).not.toHaveProperty('data.role')
                        done()
                    })
            })
        })
        describe('Register Error Response, sending status 400', () => {
            test('user not input name', (done) => {
                request(app)
                    .post('/register/user')
                    .send({
                        name: '',
                        email: 'dimas@day.com',
                        password: 'dimas'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', "required name")
                        done()
                    })
            })
            test('user not input email', (done) => {
                request(app)
                .post('/register/user')
                .send({
                    name: 'dimas',
                    email: '',
                    password: 'dimas'
                })
                .end((err, response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty('msg', "required email")
                    done()
                })
            })
            test('user email input is an existing email', (done) => {
                request(app)
                .post('/register/user')
                .send({
                    name: 'dadday',
                    email: 'dadday@day.com',
                    password: '123456789'
                })
                .end((err, response) => {
                    expect(response.body).toHaveProperty('msg', 'email has already existed')
                    expect(response.status).toBe(400)
                    done()
                })
            })
            test("user not input password", (done) => {
                request(app)
                .post('/register/user')
                .send({
                    name: 'dimas',
                    email: 'dimas@day.com',
                    password: ''
                })
                .end((err, response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty('msg', "required password")
                    done()
                })
            })
            test("user's password length is less than 8 characters", (done) => {
                request(app)
                .post('/register/user')
                .send({
                    name: 'dimas',
                    email: 'dimas@day.com',
                    password: 'dimas'
                })
                .end((err, response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty('msg', "Minimum password length is 8 characters")
                    done()
                })
            })
        })
    })
    
    describe('User Login Test', () => {
        describe('it should be successfully logged in and sending status 200', () => {
            test('logged in success', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'dadday@day.com',
                        password: '123456789'
                    })
                    .end((err, response) => {
                        console.log(response.body)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('msg', "login success")
                        expect(response.body).toHaveProperty('data.name', expect.any(String))
                        expect(response.body).toHaveProperty('data.email', expect.stringMatching(/[@.com|co]/))
                        expect(response.body).toHaveProperty('data.role', expect.any(String))
                        expect(response.body).toHaveProperty('data.access_token', expect.any(String))
                        expect(response.body).not.toHaveProperty('data.password')
                        done()
                    })
            })
        })
        describe('it should give status 400 and error message', () => {
            test('no email input', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: '',
                        password: 'dimas123'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', "email / password incorrect")
                        done()
                    })
            })
            test('incorrect email format', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'dadday',
                        password: 'dimas123'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', "email / password incorrect")
                        done()
                    })
            })
            test('incorrect email input', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'dimas@dimas.com',
                        password: 'dimas123'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', "email / password incorrect")
                        done()
                    })
            })
            test('no password', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'dimas@day.com',
                        password: ''
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', "email / password incorrect")
                        done()
                    })
            })
            test('incorrect password', (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'dimas@day.com',
                        password: 'dimas'
                    })
                    .end((err, response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', "email / password incorrect")
                        done()
                    })
            })
        })
    })
})