const app = require('../app')
const request = require('supertest')
const Sequelize = require('sequelize')
const { Admin, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let id_params = ''
let token = ''

describe(`This is product CRUD test`, () => {
    beforeAll((done) => {
        Admin.create({
            email: 'mail@mail.com',
            password: '12345',
        })
        .then((data) => {
            let payload = {
                id: data.id,
                email: data.email
            }
            token = jwt.sign(payload, 'ucul')
            done()
        })
        .catch((err) => done(err))
    })

    beforeEach((done) => {
        Product.create({
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 10000,
            stock: 10,
            category: `Fashions`
        })
        .then((data) => {
            return Product.findOne({
                where: {
                    name: data.name
                }
            })
        })
        .then((data) => {
            if (!data) done()
            else {
                id_params = data.id
                done()
            }
        })
        .catch((err) => done(err))
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
        .then(() => {
            return Admin.destroy({
                where: {
                    email: `mail@mail.com`
                }
            })
        })
        .then(() => done())
        .catch((err) => done(err))
    })

    test(`product create expectation`, (done) => {
        request(app)
        .post('/product')
        .set('token', token)
        .send({
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 10000,
            stock: 10,
            category: `Electronics`
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
        .get('/products')
        .set('token', token)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('products')
            expect(response.status).toBe(200)
            done()
        })
    })
    test(`product update success expectation`, (done) => {
        request(app)
        .put(`/product/${id_params}`)
        .set('token', token)
        .send({
            name: 'Bag',
            imageUrl: 'bit.ly/image.jpg',
            price: 100,
            stock: 5,
            category: 'Fashions'
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty(`products`)
            expect(response.body).toHaveProperty(`message`)
            expect(response.body.message).toBe(`success update product at id ${id_params}`)
            expect(response.status).toBe(200)
            done()
        })
    })
    test(`product delete expectation`, (done) => {
        request(app)
        .delete(`/product/${id_params}`)
        .set('token', token)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe(`success deleted product at id ${id_params}`)
            expect(response.status).toBe(200)
            done()
        })
    })
    test(`validation error on product`, (done) => {
        request(app)
        .post('/product')
        .set('token', token)
        .send({
            name: '',
            imageUrl: '',
            price: -1000,
            stock: -2,
            category: 'Fashions'
        })
        .end((err, response) => {
            console.log(response.body)
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body).toHaveProperty('details')
            expect(response.status).toBe(400)
            done()
        })
    })
    test(`product not found or has been deleted`, (done) => {
        request(app)
        .delete(`/product/200`)
        .set('token', token)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('product may has been already deleted')
            expect(response.status).toBe(404)
            done()
        })
    })
    test(`Broken token or unregistered user`, (done) => {
        request(app)
        .get('/products')
        .set('token', `asdasdasfaffeadaedawdaacefawdaw`)
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('jwt malformed')
            expect(response.status).toBe(401)
            done()
        })
    })
})