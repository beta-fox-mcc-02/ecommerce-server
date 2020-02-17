const request = require('supertest');
const app = require('../app');
const Sequelize = require('sequelize');
const {User, sequelize} = require('../models');
const {queryInterface} = sequelize;


describe('User Register Test', () =>{
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
          .then(response => {
            done()
          }).catch(err => done(err))
      })

    test('It should return new user object and status 201', (done) => {
        request(app)
            .post('/register')
            .send({
                username: 'user',
                email: 'user@gmail.com',
                password: '12345',
                roles: 'admin'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('username', 'user');
                expect(response.body).toHaveProperty('email', 'user@gmail.com');
                expect(response.body).toHaveProperty('roles', 'admin');
                expect(response.body).toHaveProperty('password', expect.any(String));
                expect(response.status).toBe(201);
                done();
            })
    });

    test('It should return email unique constraint error', (done) => {
        request(app)
            .post('/register')
            .send({
                username: 'user1',
                email: 'user@gmail.com',
                password: '12345',
                roles: 'admin'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeUniqueConstraintError');
                expect(response.body).toHaveProperty('message', 'Bad request');                
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return username unique constraint error', (done) => {
        request(app)
            .post('/register')
            .send({
                username: 'user',
                email: 'user1@gmail.com',
                password: '12345',
                roles: 'admin'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeUniqueConstraintError');
                expect(response.body).toHaveProperty('message', 'Bad request');                
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return email format validation error', (done) => {
        request(app)
            .post('/register')
            .send({
                username: 'user',
                email: 'user@gmail',
                password: '12345',
                roles: 'admin'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
                expect(response.body).toHaveProperty('message', 'Bad request');                
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return roles format validation error', (done) => {
        request(app)
            .post('/register')
            .send({
                username: 'user2',
                email: 'user2@gmail',
                password: '12345',
                roles: 'admin'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
                expect(response.body).toHaveProperty('message', 'Bad request');  
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return notEmpty validation error', (done) => {
        request(app)
            .post('/register')
            .send({
                username: '',
                email: 'user@gmail.com',
                password: '',
                roles: 'admin'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
                expect(response.body).toHaveProperty('message', 'Bad request');  
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });
});

describe('User Login Test', () =>{
    beforeAll((done) => {
        User.create({
            username: 'admin',
            email: 'admin@gmail.com',
            password: '12345',
            roles: 'admin'
        })
            .then(_=> {
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    // afterAll((done) => {
    //     queryInterface.bulkDelete('Users', {})
    //       .then(response => {
    //         done()
    //       }).catch(err => done(err))
    //   })

    test('It should return new user object and status 200', (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'admin@gmail.com',
                password: '12345'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('access_token', expect.any(String));
                expect(response.status).toBe(200);
                done();
            })
    });

    test('It should return username or password validation error', (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'admin@gmail.com',
                password: '12345678'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Not found');
                expect(response.body).toHaveProperty('message', 'Not found');                
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(404);
                done();
            })
    });
})



