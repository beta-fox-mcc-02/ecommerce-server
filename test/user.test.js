const request = require('supertest');
const app = require('../app');
const Sequelize = require('sequelize');
const {User, sequelize} = require('../models');
const {queryInterface} = sequelize;


describe('User Register Test', () =>{
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
                username: 'user',
                email: 'user@gmail.com',
                password: '12345',
                roles: 'admin'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.name).toBe('SequelizeUniqueConstraintError');
                expect(response.message).toBe('Bad request');
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return username unique constraint error', (done) => {
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
                expect(err.name).toBe('SequelizeUniqueConstraintError');
                expect(response.message).toBe('Bad request');
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return email format validation error', (done) => {
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
                expect(err.name).toBe('SequelizeValidationError');
                expect(response.message).toBe('Bad request');
                expect(response.status).toBe(400);
                done();
            })
    });
})


