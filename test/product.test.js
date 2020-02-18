const request = require('supertest');
const app = require('../app');
const Sequelize = require('sequelize');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { Person, Product } = require('../models/index');
const { generateToken } = require('../helpers/jwt');

describe('People Routes', () => {
    let tokenAdmin;
    let tokenUser;
    let productID;

    beforeAll((done) => {
        Person.create({
            email: 'admintest@mail.com',
            password: '654321',
            user_role: 'admin',
        })
            .then(person => {
                let payload = {
                    id: person.id,
                    email: person.email,
                    password: person.password,
                    user_role: person.user_role
                };
                tokenAdmin = generateToken(payload);
                return Person.create({
                    email: 'usertest@mail.com',
                    password: '654321',
                    user_role: 'user',
                })
            })
            .then(person => {
                let payload = {
                    id: person.id,
                    email: person.email,
                    password: person.password,
                    user_role: person.user_role
                };
                tokenUser = generateToken(payload);
                return Product.create({
                    name: 'Produk Testing',
                    image_url: '',
                    price: '100000',
                    stock: '100'
                })
            })
            .then(product => {
                productID = product.id
                done()
            })
            .catch(err => {
                done(err);
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

    describe('Product Create', () => {
        test('Return new product object and status 201', (done) => {
            request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send({
                    name: 'Baju',
                    image_url: 'tes',
                    price: 50000,
                    stock: 2,
                    id: 1
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('id', expect.any(Number))
                    expect(response.body).toHaveProperty('name', expect.any(String))
                    expect(response.body).toHaveProperty('image_url', expect.any(String))
                    expect(response.body).toHaveProperty('price', expect.any(Number))
                    expect(response.body).toHaveProperty('stock', expect.any(Number))
                    expect(response.status).toBe(201)
                    done()
                })
        })

        test('Return error when name is empty, status 400', (done) => {
            request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send({
                    name: '',
                    image_url: '',
                    price: 50000,
                    stock: 2
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(400);
                    expect(response.body.error[0]).toBe(`Name is Required`);
                    done()
                })
        })

        test('Return error when price is below 0, status 400', (done) => {
            request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send({
                    name: 'Baju',
                    image_url: '',
                    price: -1,
                    stock: 2
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(400);
                    expect(response.body.error[0]).toBe(`Price can't be Negative Number`);
                    done()
                })
        })

        test('Return error when stock is below 1, status 400', (done) => {
            request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send({
                    name: 'Baju',
                    image_url: '',
                    price: 50000,
                    stock: 0
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(400);
                    expect(response.body.error[0]).toBe(`You should have the item in stock!`);
                    done()
                })
        })

        test('Return error when price is not number, status 400', (done) => {
            request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send({
                    name: 'Baju',
                    image_url: '',
                    price: 'sepuluh',
                    stock: 1
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(400);
                    expect(response.body.error).toBe(`Invalid input`);
                    done()
                })
        })

        test('Return error when stock is not number, status 400', (done) => {
            request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send({
                    name: 'Baju',
                    image_url: '',
                    price: 50000,
                    stock: 'sepuluh'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(400);
                    expect(response.body.error).toBe(`Invalid input`);
                    done()
                })
        })

        test('Return error when user is not log in or wrong token, status 401', (done) => {
            request(app)
                .post('/products')
                .set('token', tokenUser)
                .send({
                    name: 'Baju',
                    image_url: '',
                    price: 50000,
                    stock: 'sepuluh'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe(`Unauthorized`);
                    done()
                })
        })
    })

    describe('Product Edit', () => {
        test('Return edited product object and status 200', (done) => {
            request(app)
                .put(`/products/${productID}`)
                .set('token', tokenAdmin)
                .send({
                    name: 'Edit Testing',
                    image_url: '',
                    price: 50000,
                    stock: 5
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('id', expect.any(Number))
                    expect(response.body).toHaveProperty('name', expect.any(String))
                    expect(response.body).toHaveProperty('image_url', expect.any(String))
                    expect(response.body).toHaveProperty('price', expect.any(Number))
                    expect(response.body).toHaveProperty('stock', expect.any(Number))
                    expect(response.status).toBe(200)
                    done()
                })
        })

        test('Return error when miss validation requirement and status 400', (done) => {
            request(app)
                .put(`/products/${productID}`)
                .set('token', tokenAdmin)
                .send({
                    name: '',
                    image_url: '',
                    price: -1,
                    stock: 5
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty('error', expect.any(Array));
                    done()
                })
        })

        test('Return error when product is not found or already deleted and status 404', (done) => {
            request(app)
                .put(`/products/1`)
                .set('token', tokenAdmin)
                .send({
                    name: 'Edit Testing',
                    image_url: '',
                    price: 50000,
                    stock: 5
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(404);
                    expect(response.body.error).toBe('Product not found');
                    done()
                })
        })

        test('Return error when unauthorized and status 401', (done) => {
            request(app)
                .put(`/products/${productID}`)
                .set('token', tokenUser)
                .send({
                    name: 'Edit Testing',
                    image_url: '',
                    price: 50000,
                    stock: 5
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe(`Unauthorized`);
                    done()
                })
        })
    })

    describe('Product Delete', () => {
        test('Return numbers of deleted product and status 200', (done) => {
            request(app)
                .delete(`/products/${productID}`)
                .set('token', tokenAdmin)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('data', expect.any(Number))
                    expect(response.body).toHaveProperty('message', expect.any(String))
                    expect(response.status).toBe(200)
                    done()
                })
        })

        test('Return error when unauthorized and status 401', (done) => {
            request(app)
                .delete(`/products/${productID}`)
                .set('token', tokenUser)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe(`Unauthorized`);
                    done()
                })
        })

        test('Return error when product is not found or already deleted and status 404', (done) => {
            request(app)
                .delete(`/products/1`)
                .set('token', tokenAdmin)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('type', expect.any(String));
                    expect(response.status).toBe(404);
                    expect(response.body.error).toBe(`Product not found`);
                    done()
                })
        })
    })

    describe('Product Read All', () => {
        test.only('Return array of all product objects and status 200', (done) => {
            request(app)
                .get(`/products`)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toStrictEqual(expect.any(Array))
                    expect(response.status).toBe(200)
                    done()
                })
        })
    })
})