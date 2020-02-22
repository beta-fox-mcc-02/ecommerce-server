const request = require('supertest')
const app = require('../app.js')
const Sequelize = require('sequelize')
const { Op } = Sequelize
const { Admin, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
let token = ''

describe('API route test', () => {
    beforeAll((done) => {
        let master = {
            id: 1,
            email: 'masteradmin@smail.com'
        }
        token = jwt.sign(master, 'ucul')
        done()
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Admins', {
            where: {
                email: {
                    [Op.not]: `masteradmin@smail.com`
                }
            }
        })
        .then(() => done())
        .catch((err) => done(err))
    })

    test('get all registered admins success', (done) => {
        request(app)
        .get('/admins')
        .set('token', token)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('admins')
            expect(response.status).toBe(200)
            done()
        })
    })
    test('success register', (done) => {
        request(app)
        .post('/admin/register')
        .set('token', token)
        .send({
            email: `mail@mail.com`,
            password: `12345`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe(`Success added new admin mail@mail.com`)
            expect(response.status).toBe(201)
            done()
        })
    })
    test('success login', (done) => {
        request(app)
        .post('/admin/login')
        .send({
            email: `masteradmin@smail.com`,
            password: `12345`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('token')
            expect(response.status).toBe(200)
            done()
        })
    })
    test('email exist or sequelize validation error register error', (done) => {
        request(app)
        .post('/admin/register')
        .set('token', token)
        .send({
            email: `mail@mail.com`,
            password: `qqqqq`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body).toHaveProperty(`details`)
            expect(response.status).toBe(400)
            done()
        })
    })
    test('login admin not found', (done) => {
        request(app)
        .post('/admin/login')
        .send({
            email: `ayam@mail.com`,
            password: `12345`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe(`user not found`)
            expect(response.status).toBe(404)
            done()
        })
    })

    test('login password invalid', (done) => {
        request(app)
        .post('/admin/login')
        .send({
            email: `mail@mail.com`,
            password: `1234566`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe(`input invalid`)
            expect(response.status).toBe(400)
            done()
        })
    })
    test('Broken token or unidentified credentials', (done) => {
        request(app)
        .post('/admin/register')
        .set('token', 'sadasdbasdbasdbasd')
        .send({
            email: `smail@mail.com`,
            password: `qqqqq`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('jwt malformed')
            expect(response.status).toBe(401)
            done()
        })
    })
})