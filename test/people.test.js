const request = require('supertest');
const app = require('../app');
const Sequelize = require('sequelize');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;

describe('People Routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('People', {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('Person Register', () => {
        test('Return new person object + token and status 201', (done) => {
            request(app)
                .post('/register')
                .send({
                    email: 'admin@mail.com',
                    password: '654321',
                    user_role: 'admin'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('id', expect.any(Number))
                    expect(response.body).toHaveProperty('email', expect.any(String))
                    expect(response.body).toHaveProperty('user_role', expect.any(String))
                    expect(response.body).toHaveProperty('token', expect.any(String))
                    expect(response.status).toBe(201)
                    done()
                })
        })

        test('Return error object when email or password or user_role is empty 400', (done) => {
            request(app)
                .post('/register')
                .send({
                    email: '',
                    password: '',
                    user_role: ''
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty('error', expect.any(Array));
                    done()
                })
        })

        test('Return error object when duplicate email and status 400', (done) => {
            request(app)
                .post('/register')
                .send({
                    email: 'admin@mail.com',
                    password: '654321',
                    user_role: 'admin'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(400);
                    expect(response.body.error).toBe('Email already registered');
                    done()
                })
        })
    })

    describe('Person Login', () => {
        test('Return object of login person and status 200', (done) => {
            request(app)
                .post('/login')
                .send({
                    email: 'admin@mail.com',
                    password: '654321'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('id', expect.any(Number))
                    expect(response.body).toHaveProperty('email', expect.any(String))
                    expect(response.body).toHaveProperty('user_role', expect.any(String))
                    expect(response.body).toHaveProperty('token', expect.any(String))
                    expect(response.status).toBe(200)
                    done()
                })
        })

        test('Return error when username or password is wrong and status 401', (done) => {
            request(app)
                .post('/login')
                .send({
                    email: 'amin@mail.com',
                    password: '654321'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe('Email/Password Wrong');
                    done()
                })
        })

        test('Return error when username or password is invalid input and status 500', (done) => {
            request(app)
                .post('/login')
                .send({
                    em: '',
                    password: '654321'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(500);
                    expect(response.body).toHaveProperty('error', expect.any(String));
                    done()
                })
        })
    })

})