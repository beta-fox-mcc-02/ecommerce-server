const request = require('supertest');
const app = require('../app');
const {
    Product,
    User,
    sequelize
} = require('../models');
const {
    queryInterface
} = sequelize;
const jwt = require('../helpers/jwtoken');

let token;
let token2;
beforeAll((done) => {

    // User with roles as admin
    User.create({
            username: 'administrator',
            email: 'administrator@gmail.com',
            password: '12345',
            roles: 'admin'
        })
        .then(newUser => {
            const payload = {
                id: newUser.id,
                email: newUser.email,
                roles: newUser.roles
            }
            token = jwt.generateToken(payload);
            done();
        })
        .catch(err => {
            done(err)
        })

    // User with roles as client
    User.create({
            username: 'clientbiasa',
            email: 'clientbiasa@gmail.com',
            password: '12345',
            roles: 'client'
        })
        .then(newUser => {
            const payload = {
                id: newUser.id,
                email: newUser.email,
                roles: newUser.roles
            }

            token2 = jwt.generateToken(payload);
            done();
        })
        .catch(err => {
            done(err)
        })
});

describe('Product create test', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
            .then(response => {
                done()
            }).catch(err => done(err))
    })

    test('It should return new product object and status 201', (done) => {
        request(app)
            .post('/product')
            .set('access_token', token)
            .send({
                name: 'Book',
                image_url: 'http://google.com',
                price: 23500,
                stock: 5
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Book');
                expect(response.body).toHaveProperty('image_url', 'http://google.com');
                expect(response.body).toHaveProperty('price', '23500');
                expect(response.body).toHaveProperty('stock', 5);
                expect(response.status).toBe(201);
                done();
            })
    });

    test('It should return authentication error', (done) => {
        request(app)
            .post('/product')
            .send({
                name: 'Book',
                image_url: 'http://google.com',
                price: 23500,
                stock: 5
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Not authenticated');
                expect(response.body).toHaveProperty('message', 'You are not authenticated');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(500);
                done();
            })
    });

    test('It should return authorization error', (done) => {
        request(app)
            .post('/product')
            .set('access_token', token2)
            .send({
                name: 'Book',
                image_url: 'http://google.com',
                price: 23500,
                stock: 5
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Not authorized');
                expect(response.body).toHaveProperty('message', 'You are not authorized');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(500);
                done();
            })
    });

    test('It should return not empty validation error', (done) => {
        request(app)
            .post('/product')
            .set('access_token', token)
            .send({
                name: '',
                image_url: 'http://google.com',
                price: '',
                stock: ''
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
                expect(response.body).toHaveProperty('message', 'Bad request');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return not empty validation error', (done) => {
        request(app)
            .post('/product')
            .set('access_token', token)
            .send({
                name: '',
                image_url: 'http://google.com',
                price: '',
                stock: ''
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
                expect(response.body).toHaveProperty('message', 'Bad request');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return url format validation error', (done) => {
        request(app)
            .post('/product')
            .set('access_token', token)
            .send({
                name: 'Book',
                image_url: 'http://google',
                price: 24000,
                stock: 5
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
                expect(response.body).toHaveProperty('message', 'Bad request');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return mininimum price validation error', (done) => {
        request(app)
            .post('/product')
            .set('access_token', token)
            .send({
                name: 'Book',
                image_url: 'http://google.com',
                price: -1,
                stock: 5
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
                expect(response.body).toHaveProperty('message', 'Bad request');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

    test('It should return mininimum price validation error', (done) => {
        request(app)
            .post('/product')
            .set('access_token', token)
            .send({
                name: 'Book',
                image_url: 'http://google.com',
                price: 24000,
                stock: -1
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
                expect(response.body).toHaveProperty('message', 'Bad request');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(400);
                done();
            })
    });

})

describe('Product findAll test', () => {

    beforeAll((done) => {
        Product.create({
                name: 'Book',
                image_url: 'http://e-commerce.com/test.png',
                price: '24000',
                stock: 5
            })
            .then(_ => {
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
            .then(response => {
                done()
            }).catch(err => done(err))
    })

    test('It should return new product object and status 200', (done) => {
        request(app)
            .get('/product')
            .set('access_token', token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body[0]).toHaveProperty('name', 'Book');
                expect(response.body[0]).toHaveProperty('image_url', 'http://e-commerce.com/test.png');
                expect(response.body[0]).toHaveProperty('price', '24000');
                expect(response.body[0]).toHaveProperty('stock', 5);
                expect(response.body).toHaveLength(1);
                expect(response.status).toBe(200);
                done();
            })
    });

    test('It should return authentication error', (done) => {
        request(app)
            .get('/product')
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Not authenticated');
                expect(response.body).toHaveProperty('message', 'You are not authenticated');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(500);
                done();
            })
    });
});

describe('Product delete test', () => {
    let id;
    let id2;
    beforeAll((done) => {
        Product.create({
                name: 'Book',
                image_url: 'http://e-commerce.com/test.png',
                price: '24000',
                stock: 5
            })
            .then(product => {
                id = product.id;
                done();
            })
            .catch(err => {
                done(err);
            })

        Product.create({
                name: 'Magazine',
                image_url: 'http://e-commerce.com/magazine.png',
                price: '50000',
                stock: 10
            })
            .then(product => {
                id2 = product.id;
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
            .then(response => {
                done()
            }).catch(err => done(err))
    })

    test('It should return delete product message and status 200', (done) => {
        request(app)
            .delete(`/product/${id}`)
            .set('access_token', token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('message', `Product is deleted`);
                expect(response.status).toBe(200);
                done();
            })
    });

    test('It should return error delete product because product is not exist and status 404', (done) => {
        request(app)
            .delete(`/product/${id}`)
            .set('access_token', token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', `Not found`);
                expect(response.body).toHaveProperty('message', `Product is not exist`);
                expect(response.status).toBe(404);
                done();
            })
    });

    test('It should return authentication error', (done) => {
        request(app)
            .delete(`/product/${id2}`)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Not authenticated');
                expect(response.body).toHaveProperty('message', 'You are not authenticated');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(500);
                done();
            })
    });

    test('It should return authorization error', (done) => {
        request(app)
            .delete(`/product/${id2}`)
            .set('access_token', token2)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Not authorized');
                expect(response.body).toHaveProperty('message', 'You are not authorized');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(500);
                done();
            })
    });
});

describe('Product update test', () => {
    let id;
    beforeAll((done) => {
        Product.create({
                name: 'Book',
                image_url: 'http://e-commerce.com/test.png',
                price: '24000',
                stock: 5
            })
            .then(product => {
                id = product.id;
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    test('It should return updated product info and status 200', (done) => {
        request(app)
            .patch(`/product/${+id}`)
            .set('access_token', token)
            .send({
                name: 'Updated Book',
                image_url: 'http://e-commerce.com/test.png',
                price: '24000',
                stock: 3
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', `Updated Book`);
                expect(response.body).toHaveProperty('image_url', `http://e-commerce.com/test.png`);
                expect(response.body).toHaveProperty('price', `24000`);
                expect(response.body).toHaveProperty('stock', 3);
                expect(response.body).toHaveProperty('message', `Success updated product ${id}`)
                expect(response.status).toBe(200);
                done();
            })
    });

    test('It should return error update product because product is not exist and status 404', (done) => {
        request(app)
            .patch(`/product/${+id + 10}`)
            .set('access_token', token)
            .send({
                name: 'Updated Book',
                image_url: 'http://e-commerce.com/test.png',
                price: '24000',
                stock: 3
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('message', `Product is not exist`);
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(404);
                done();
            })
    });

    test('It should return authentication error', (done) => {
        request(app)
            .patch(`/product/${+id}`)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Not authenticated');
                expect(response.body).toHaveProperty('message', 'You are not authenticated');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(500);
                done();
            })
    });

    test('It should return authorization error', (done) => {
        request(app)
            .patch(`/product/${+id}`)
            .set('access_token', token2)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty('name', 'Not authorized');
                expect(response.body).toHaveProperty('message', 'You are not authorized');
                expect(response.body).toHaveProperty('errors', expect.any(Array));
                expect(response.status).toBe(500);
                done();
            })
    });
});
