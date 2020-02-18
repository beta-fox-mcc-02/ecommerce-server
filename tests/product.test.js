const app = require('../app')
const request = require('supertest')
const Sequelize = require('sequelize')
const { Admin, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let access_token = ''
let id_params = '1' // ubah manual-----------------

describe(`This is product CRUD test`, () => {
    beforeAll((done) => {
        Admin.create({
            email: 'mail@mail.com',
            password: '12345',
        })
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token = jwt.sign(payload, 'ucul')
            done()
        })
        .catch((err) => done(err))
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
        .then(() => done())
        .catch((err) => done(err))
    })

    test(`product create expectation`, (done) => {
        request(app)
        .post('/product/create')
        .set('token', access_token)
        .send({
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 10000,
            stock: 10
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('successfully added Bag to database')
            expect(response.status).toBe(201)
            done()
        })
    })
    test(`product show all expectation`, (done) => {
        request(app)
        .get('/product/findall')
        .set('token', access_token)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('products')
            expect(response.status).toBe(200)
            done()
        })
    })
    test(`product update success expectation`, (done) => {
        request(app)
        .put(`/product/update/${id_params}`)
        .set('token', access_token)
        .send({
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 100,
            stock: 5
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty(`products`)
            expect(response.body).toHaveProperty(`message`)
            expect(response.body.message).toBe('success update product at id 1')
            expect(response.status).toBe(200)
            done()
        })
    })
    test(`product delete expectation`, (done) => {
        request(app)
        .delete(`/product/delete/${id_params}`)
        .set('token', access_token)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('success deleted product at id 1')
            expect(response.status).toBe(200)
            done()
        })
    })

    test(`unidentified credentials / broken token detected`, (done) => {
        request(app)
        .post('/product/create')
        .set('token', 'yJhbIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwiaWF0IjoxNTgxOTI4NjQzfQ.6dnI1ajyTtFxGbrkwctcDJnmQ0Xn7ttjEwk9OI5DEgU')
        .send({
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 10000,
            stock: 10
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('invalid token')
            expect(response.status).toBe(401)
            done()
        })
    })
    test(`validation error on product`, (done) => {
        request(app)
        .post('/product/create')
        .set('token', access_token)
        .send({
            name: '',
            imageUrl: '',
            price: -1000,
            stock: -2
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.status).toBe(400)
            done()
        })
    })
    test(`product show all error expectation`, (done) => {
        request(app)
        .get('/product/findal')
        .set('token', access_token)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).not.toHaveProperty('products')
            expect(response.status).toBe(404)
            done()
        })
    })
    test(`product not found or has been deleted`, (done) => {
        request(app)
        .delete(`/product/delete/${id_params}`)
        .set('token', access_token)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('product may has been already deleted')
            expect(response.status).toBe(404)
            done()
        })
    })
})