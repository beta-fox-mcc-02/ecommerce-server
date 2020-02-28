const request = require('supertest')
const app = require('../app')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

describe('product testing', () => {
    let tokenUser
    let tokenAdmin
    let productId

    beforeAll((done) => {
        Product.create({
            name: 'product1',
            image_url: 'https://dummyimage.com/400x200/bdbdbd/000000',
            price: 20000,
            stock: 10
        })
            .then(response => {
                productId = response.id
                return User.create({
                    email: 'user@mail.com',
                    password: '123456',
                    role: 'user'
                })
            })
            .then(response => {
                userId = response.id
                const payloadUser = {
                    id: response.id,
                    email: response.email,
                    role: response.role
                }
                const newToken = generateToken(payloadUser)
                tokenUser = newToken

                return User.create({
                    email: 'admin@mail.com',
                    password: '123456',
                    role: 'admin'
                })
            })
            .then(response => {
                userId = response.id
                const payloadAdmin = {
                    id: response.id,
                    email: response.email,
                    role: response.role
                }
                const newToken = generateToken(payloadAdmin)
                tokenAdmin = newToken
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('create product testing', () => {
        describe('create product success testing', () => {
            test('create product success: it should return status 201 and new product object', (done) => {
                request(app)
                    .post('/products')
                    .set('token', tokenAdmin)
                    .send({
                        name: 'product1',
                        price: 30000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('data', expect.any(Object))
                        done()
                    })
            })
        })

        describe('create product error testing', () => {
            test('not null validation: it should return status 400 and error object', (done) => {
                request(app)
                    .post('/products')
                    .set('token', tokenAdmin)
                    .send({
                        name: '',
                        price: null,
                        stocks: null
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('minimum value validation: it should return status 400 and error object', (done) => {
                request(app)
                    .post('/products')
                    .set('token', tokenAdmin)
                    .send({
                        name: 'product1',
                        price: -10000,
                        stocks: -2
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('unauthenticated user: it should return status 401 and error object', (done) => {
                request(app)
                    .post('/products')
                    .set('token', 'sendInvalidToken')
                    .send({
                        name: 'product1',
                        price: 10000,
                        stocks: 2
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('unauthorized user: it should return status 401 and error object', (done) => {
                request(app)
                    .post('/products')
                    .set('token', tokenUser)
                    .send({
                        name: 'product1',
                        price: 10000,
                        stocks: 2
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })
        })
    })

    describe('read all product testing', () => {
        describe('read all product success testing', () => {
            test('it should return status 200 and object containing message and all products array', (done) => {
                request(app)
                    .get('/products')
                    .set('token', tokenAdmin)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('data', expect.any(Array))
                        done()
                    })
            })
        })

        describe('read all product error testing', () => {
            test('unauthenticated: it should return status 401 and error object', (done) => {
                request(app)
                    .get('/products')
                    .set('token', 'sendInvalidToken')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })
        })
    })

    describe('read one product testing', () => {
        describe('read one product success testing', () => {
            test('it should return status 200 and object containing message and product object', (done) => {
                request(app)
                    .get(`/products/${productId}`)
                    .set('token', tokenAdmin)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('data', expect.any(Object))
                        done()
                    })
            })
        })

        describe('read one product error testing', () => {
            test('not found: it should return status 404 and object containing message', (done) => {
                request(app)
                    .get(`/products/${productId - 1}`)
                    .set('token', tokenAdmin)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('unauthenticated user: it should return status 401 and error object', (done) => {
                request(app)
                    .get(`/products/${productId}`)
                    .set('token', 'sendInvalidToken')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })
        })
    })

    describe('edit product testing', () => {
        describe('edit product success testing', () => {
            test('it should return status 200 and edited product object', (done) => {
                request(app)
                    .put(`/products/${productId}`)
                    .set('token', tokenAdmin)
                    .send({
                        name: 'product1',
                        price: 20000,
                        stocks: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('data', expect.any(Array))
                        done()
                    })
            })
        })

        describe('edit product error testing', () => {
            test('not null validation: it should return status 400 and error object', (done) => {
                request(app)
                    .put(`/products/${productId}`)
                    .set('token', tokenAdmin)
                    .send({
                        name: '',
                        price: null,
                        stocks: null
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('minimum value validation: it should return status 400 and error object', (done) => {
                request(app)
                    .put(`/products/${productId}`)
                    .set('token', tokenAdmin)
                    .send({
                        name: 'product1',
                        price: -10000,
                        stocks: -2
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        expect(response.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            test('not found: it should return status 404 and object containing message', (done) => {
                request(app)
                    .put(`/products/${productId - 1}`)
                    .set('token', tokenAdmin)
                    .send({
                        name: 'product1',
                        price: 20000,
                        stocks: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('unauthenticated user: it should return status 401 and error object', (done) => {
                request(app)
                    .put(`/products/${productId}`)
                    .set('token', 'sendInvalidToken')
                    .send({
                        name: 'product1',
                        price: 10000,
                        stocks: 2
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('unauthorized user: it should return status 401 and error object', (done) => {
                request(app)
                    .put(`/products/${productId}`)
                    .set('token', tokenUser)
                    .send({
                        name: 'product1',
                        price: 10000,
                        stocks: 2
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })
        })
    })

    describe('delete product testing', () => {
        describe('delete product success testing', () => {
            test('it should return status 200 and object containing message', (done) => {
                request(app)
                    .delete(`/products/${productId}`)
                    .set('token', tokenAdmin)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })
        })

        describe('delete product error testing', () => {
            test('unauthenticated user: it should return status 401 and error object', (done) => {
                request(app)
                    .delete(`/products/${productId}`)
                    .set('token', 'sendInvalidToken')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('unauthorized user: it should return status 401 and error object', (done) => {
                request(app)
                    .delete(`/products/${productId}`)
                    .set('token', tokenUser)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })

            test('not found: it should return status 404 and object containing message', (done) => {
                request(app)
                    .delete(`/products/${productId - 1}`)
                    .set('token', tokenAdmin)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('msg', expect.any(String))
                        done()
                    })
            })
        })
    })
})