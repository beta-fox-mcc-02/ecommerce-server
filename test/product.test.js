const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const {Admin, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const {createToken} = require('../helpers/jwt')
var testToken = ''

describe('Product add test', () => {
    beforeAll((done) => {
        Admin.create({
            email : 'kiko@mail.com',
            password : 'admin123'
        })
        .then(res => {
            testToken = createToken(res.dataValues)
            done()
        })
        .catch(done)
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
          .then(response => {
            done()
          }).catch(err => done(err))
        queryInterface.bulkDelete('Admins', {})
          .then(response => {
            done()
          }).catch(err => done(err))
    })
    test('it should return new product', (done) => {
        request(app).post('/products/list')
            .set('token', testToken)
            .send({
                name : 'baju',
                image_url : '',
                price : 1000,
                stock : 1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('name')
                expect(response.body).toHaveProperty('image_url')
                expect(response.body).toHaveProperty('price')
                expect(response.body).toHaveProperty('stock')
                expect(response.status).toBe(201)
                done()
            })
    })
    test('it should return error validation "name cannot empty"', (done) => {
        request(app).post('/products/list')
            .set('token', testToken)
            .send({
                name : '',
                image_url : '',
                price : 1000,
                stock : 1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('name cannot empty')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "price must greater than 0"', (done) => {
        request(app).post('/products/list')
            .set('token', testToken)
            .send({
                name : '',
                image_url : '',
                price : 0,
                stock : 1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('price must greater than 0')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "stock must greater than 0"', (done) => {
        request(app).post('/products/list')
            .set('token', testToken)
            .send({
                name : '',
                image_url : '',
                price : 1000,
                stock : 0
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('stock must greater than 0')
                expect(response.status).toBe(400)
                done()
            })
    })
})
