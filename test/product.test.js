const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize, Product } = require('../models')
const { generatetoken } = require('../helpers/jwt')

const { queryInterface } = sequelize


let tokenAdmin = ""
let product_id = ''

describe('Products', () => {
    describe('Add products', () => {
        describe('success add product', () => {
            beforeEach((done) => {
                User.create({
                    first_name: "Dadang",
                    last_name: "Kardun",
                    address: "Bandung",
                    email: "dadang@mail.com",
                    password: "inipassword",
                    role: true
                })
                    .then(user => {
                        tokenAdmin = generatetoken({
                            id: user.id,
                            email: user.email
                        })
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            afterEach((done) => {
                queryInterface.bulkDelete('Users', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            afterEach((done) => {
                queryInterface.bulkDelete('Products', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })


            test('return object new product with status 200', (done) => {
                request(app)
                    .post('/products')
                    .set('token', tokenAdmin)
                    .send({
                        name: "Jersey Home Chelsea FC",
                        image_url: "http://link-foto.com",
                        price: 1500000,
                        stock: 10
                    })
                    .end((err, response) => {
                        const { body } = response
                        expect(err).toBe(null)
                        expect(body).toHaveProperty('name', expect.any(String))
                        expect(body).toHaveProperty('image_url', expect.any(String))
                        expect(body).toHaveProperty('price', expect.any(Number))
                        expect(body).toHaveProperty('stock', expect.any(Number))
                        done()
                    })
            })
        })

        describe('failed add products', () => {
            describe('error for authorization', () => {
                beforeEach((done) => {
                    User.create({
                        first_name: "Dadang",
                        last_name: "Kardun",
                        address: "Bandung",
                        email: "dadang@mail.com",
                        password: "inipassword"
                    })
                        .then(user => {
                            tokenAdmin = generatetoken({
                                id: user.id,
                                email: user.email
                            })
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                })
    
                afterEach((done) => {
                    queryInterface.bulkDelete('Users', {})
                        .then(response => {
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                })
    
                afterEach((done) => {
                    queryInterface.bulkDelete('Products', {})
                        .then(response => {
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                })

                test('return message error and status', (done) => {
                    request(app)
                        .post('/products')
                        .send({
                            name: "Jersey Home Chelsea FC",
                            image_url: "http://link-foto.com",
                            price: 1500000,
                            stock: 10
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.status).toBe(401)
                            expect(response.body).toHaveProperty('msg', 'youre not authorized')
                            done()
                        })
                })
            })

            
            describe('error for validation', () => {
                beforeEach((done) => {
                    User.create({
                        first_name: "Dadang",
                        last_name: "Kardun",
                        address: "Bandung",
                        email: "dadang@mail.com",
                        password: "inipassword",
                        role: true
                    })
                        .then(user => {
                            tokenAdmin = generatetoken({
                                id: user.id,
                                email: user.email
                            })
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                })
    
                afterEach((done) => {
                    queryInterface.bulkDelete('Users', {})
                        .then(response => {
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                })
    
                afterEach((done) => {
                    queryInterface.bulkDelete('Products', {})
                        .then(response => {
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                })
                test('error name cant null. return message error and status', (done) => {
                    request(app)
                        .post('/products')
                        .set('token', tokenAdmin)
                        .send({
                            name: null,
                            image_url: "http://link-foto.com",
                            price: 1500000,
                            stock: 10
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.status).toBe(400)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required name']))
                            done()
                        })
                })

                test('error image_url cant null. return message error and status', (done) => {
                    request(app)
                        .post('/products')
                        .set('token', tokenAdmin)
                        .send({
                            name: "Jersey Home Chelsea FC",
                            image_url: null,
                            price: 1500000,
                            stock: 10
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.status).toBe(400)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required iamge_url']))
                            done()
                        })
                })

                test('error price cant null. return message error and status', (done) => {
                    request(app)
                        .post('/products')
                        .set('token', tokenAdmin)
                        .send({
                            name: "Jersey Home Chelsea FC",
                            image_url: "http://link-foto.com",
                            price: null,
                            stock: 10
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.status).toBe(400)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required price']))
                            done()
                        })
                })

                test('error stock cant null. return message error and status', (done) => {
                    request(app)
                        .post('/products')
                        .set('token', tokenAdmin)
                        .send({
                            name: "Jersey Home Chelsea FC",
                            image_url: "http://link-foto.com",
                            price: 1500000,
                            stock: null
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.status).toBe(400)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['required stock']))
                            done()
                        })
                })

                test('error for price negative value. return message error and status', (done) => {
                    request(app)
                        .post('/products')
                        .set('token', tokenAdmin)
                        .send({
                            name: "Jersey Home Chelsea FC",
                            image_url: "http://link-foto.com",
                            price: -15000,
                            stock: 10
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.status).toBe(400)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['price cant negative value']))
                            done()
                        })
                })

                test('error for stock negative value. return message error and status', (done) => {
                    request(app)
                        .post('/products')
                        .set('token', tokenAdmin)
                        .send({
                            name: "Jersey Home Chelsea FC",
                            image_url: "http://link-foto.com",
                            price: 15000,
                            stock: -10
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.status).toBe(400)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['stock cant negative value']))
                            done()
                        })
                })

                test('error for link format. return message and status', (done) => {
                    request(app)
                        .post('/products')
                        .set('token', tokenAdmin)
                        .send({
                            name: "Jersey Home Chelsea FC",
                            image_url: "linkfoto",
                            price: 15000,
                            stock: 10
                        })
                        .end((err, response) => {
                            expect(err).toBe(null)
                            expect(response.status).toBe(400)
                            expect(response.body.msg).toEqual(expect.arrayContaining(['link format invalid']))
                            done()
                        })
                })
            })

        })
    })

    describe('read all products', () => {
        describe('success read all produtcs', () => {
            beforeEach((done) => {
                Product.create({
                    name: "Jersey Home Chelsea FC",
                    image_url: "http://link-foto.com",
                    price: 1500000,
                    stock: 10
                })
                    .then(product => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })

            })

            afterEach((done) => {
                queryInterface.bulkDelete('Users', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            afterEach((done) => {
                queryInterface.bulkDelete('Products', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            test('success read all product, return all products and status', (done) => {
                request(app)
                    .get('/products')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('msg', expect.any(Array))
                        done()
                    })
            })
        })
        describe('success read data, but product in database empty', () => {
            afterEach((done) => {
                queryInterface.bulkDelete('Users', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            afterEach((done) => {
                queryInterface.bulkDelete('Products', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            test('success read product. but nothing product in database', (done) => {
                request(app)
                    .get('/products')
                    .set('token', tokenAdmin)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('msg', 'Product empty')
                        done()
                    })
            })
        })
    })

    describe('update products', () => {
        describe('success update products', () => {
            beforeEach((done) => {
                User.create({
                    first_name: "Dadang",
                    last_name: "Kardun",
                    address: "Bandung",
                    email: "dadang@mail.com",
                    password: "inipassword",
                    role: true
                })
                    .then(user => {
                        tokenAdmin = generatetoken({
                            id: user.id,
                            email: user.email
                        })
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })
            
            beforeEach((done) => {
                Product.create({
                    name: "Jersey Home Chelsea FC",
                    image_url: "http://link-foto.com",
                    price: 1500000,
                    stock: 10
                })
                    .then(product => {
                        product_id = product.id
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })

            })

            afterEach((done) => {
                queryInterface.bulkDelete('Users', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            afterEach((done) => {
                queryInterface.bulkDelete('Products', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            test('update products based on id. return message and status', (done) => {
                request(app)
                    .put(`/products/${product_id}`)
                    .set('token', tokenAdmin)
                    .send({
                        name: "Jersey Away Chelsea FC",
                        image_url: "http://link-foto.com",
                        price: 1500000,
                        stock: 5
                    })
                    .end((err, response) => {
                        const { body } = response
                        expect(err).toBe(null)
                        expect(body).toHaveProperty('name', expect.any(String))
                        expect(body).toHaveProperty('image_url', expect.any(String))
                        expect(body).toHaveProperty('price', expect.any(Number))
                        expect(body).toHaveProperty('stock', expect.any(Number))
                        done()
                    })
            })
        })

        describe('error for authorization', () => {
            beforeEach((done) => {
                User.create({
                    first_name: "Dadang",
                    last_name: "Kardun",
                    address: "Bandung",
                    email: "dadang@mail.com",
                    password: "inipassword"
                })
                    .then(user => {
                        tokenAdmin = generatetoken({
                            id: user.id,
                            email: user.email
                        })
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            beforeEach((done) => {
                Product.create({
                    name: "Jersey Home Chelsea FC",
                    image_url: "http://link-foto.com",
                    price: 1500000,
                    stock: 10
                })
                    .then(product => {
                        product_id = product.id
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })

            })

            afterEach((done) => {
                queryInterface.bulkDelete('Users', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            afterEach((done) => {
                queryInterface.bulkDelete('Products', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            test('return message error and status', (done) => {
                request(app)
                    .put('/products/' + product_id)
                    .set('token', tokenAdmin)
                    .send({
                        name: "Jersey Home Chelsea FC",
                        image_url: "http://link-foto.com",
                        price: 1500000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', 'youre not authorized')
                        done()
                    })
            })
        })
    })

    describe('delete products', () => {
        describe('success delete products', () => {
            beforeEach((done) => {
                User.create({
                    first_name: "Dadang",
                    last_name: "Kardun",
                    address: "Bandung",
                    email: "dadang@mail.com",
                    password: "inipassword",
                    role: true
                })
                    .then(user => {
                        tokenAdmin = generatetoken({
                            id: user.id,
                            email: user.email
                        })
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })
            
            beforeEach((done) => {
                Product.create({
                    name: "Jersey Home Chelsea FC",
                    image_url: "http://link-foto.com",
                    price: 1500000,
                    stock: 10
                })
                    .then(product => {
                        product_id = product.id
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })

            })

            afterEach((done) => {
                queryInterface.bulkDelete('Users', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            afterEach((done) => {
                queryInterface.bulkDelete('Products', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            test('update products based on id. return message and status', (done) => {
                request(app)
                    .delete(`/products/${product_id}`)
                    .set('token', tokenAdmin)
                    .end((err, response) => {
                        const { body } = response
                        expect(err).toBe(null)
                        expect(body).toHaveProperty('msg', 'delete success')
                        done()
                    })
            })
        })

        describe('error for authorization', () => {
            beforeEach((done) => {
                User.create({
                    first_name: "Dadang",
                    last_name: "Kardun",
                    address: "Bandung",
                    email: "dadang@mail.com",
                    password: "inipassword"
                })
                    .then(user => {
                        tokenAdmin = generatetoken({
                            id: user.id,
                            email: user.email
                        })
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            beforeEach((done) => {
                Product.create({
                    name: "Jersey Home Chelsea FC",
                    image_url: "http://link-foto.com",
                    price: 1500000,
                    stock: 10
                })
                    .then(product => {
                        product_id = product.id
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })

            })

            afterEach((done) => {
                queryInterface.bulkDelete('Users', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            afterEach((done) => {
                queryInterface.bulkDelete('Products', {})
                    .then(response => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            test('return message error and status', (done) => {
                request(app)
                    .put('/products/' + product_id)
                    .set('token', tokenAdmin)
                    .send({
                        name: "Jersey Home Chelsea FC",
                        image_url: "http://link-foto.com",
                        price: 1500000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty('msg', 'youre not authorized')
                        done()
                    })
            })
        })
    })

})