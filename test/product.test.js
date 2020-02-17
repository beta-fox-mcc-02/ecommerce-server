const request = require('supertest');
const app = require('../app');
const Sequelize = require('sequelize');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;

describe('People Routes', () => {
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
                .send({
                    name: 'Baju',
                    image_url: 'tes',
                    price: 50000,
                    stock: 2
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
    })


})