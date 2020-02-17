const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const {Admin, Product, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Product add test', () => {
    beforeAll((done) => {
        Admin.create({
            email : 'kiko@mail.com',
            password : 'admin123'
        })
        .then(res => {
            done()
        })
        .catch(done)
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
          .then(response => {
            done()
          }).catch(err => done(err))
    })
    test('it should return new product', (done) => {
        request(app).post('/products/add')
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
                expect(response.status).toBe(200)
                done()
            })
    })
    test('it should return error validation "name cannot empty"', (done) => {
        request(app).post('/products/add')
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
        request(app).post('/products/add')
            .send({
                name : '',
                image_url : '',
                price : 1000,
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
        request(app).post('/products/add')
            .send({
                name : '',
                image_url : '',
                price : 1000,
                stock : 1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('stock must greater than 0')
                expect(response.status).toBe(400)
                done()
            })
    })
})
