const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Admin register test', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Admins', {})
          .then(response => {
            done()
          }).catch(err => done(err))
    })
    test('it should return new admin object with status 201', (done) => {
        request(app).post('/admin/register')
            .send({
                email: 'kiko@mail.com',
                password : 'admin123'
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('email')
                expect(response.body).toHaveProperty('password')
                expect(response.status).toBe(201)
                done()
            })
    })
    test('it should return error validation "email is already used" with status 400', (done) => {
        request(app).post('/admin/register')
            .send({
                email: 'kiko@mail.com',
                password : 'admi'
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('email is already used')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "email cannot empty" with status 400', (done) => {
        request(app).post('/admin/register')
            .send({
                email: '',
                password : 'admi'
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('email cannot empty')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "format email is wrong" with status 400', (done) => {
        request(app).post('/admin/register')
            .send({
                email: 'kikomail.com',
                password : 'admi'
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('format email is wrong')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "password cannot empty" with status 400', (done) => {
        request(app).post('/admin/register')
            .send({
                email: '',
                password : ''
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('password cannot empty')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "password must more than 5 characters" with status 400', (done) => {
        request(app).post('/admin/register')
            .send({
                email: 'kiko@mail.com',
                password : 'ad'
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('password must more than 5 characters')
                expect(response.status).toBe(400)
                done()
            })
    })
})