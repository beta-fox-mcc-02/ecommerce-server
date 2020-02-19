const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
const Op = sequelize.Sequelize.Op


let access_token = `${process.env.ADMINTOKEN}`
let wrong_token = `abcde`

let productTest = {
    name: 'test',
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 200000,
    stock: 2
}

let case1 = {
    name: '',
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 200000,
    stock: 2
}

let case2 = {
    name: null,
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 200000,
    stock: 2
}

let case3 = {
    name: 'test',
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 0,
    stock: 2
}

let case4 = {
    name: 'test',
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 200000,
    stock: 'abc'
}


describe('Product Routes', () => {

    afterAll(done => {
        queryInterface.bulkDelete('Users', {where: {id: {[Op.ne]:1}}})
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    afterAll(done => {
        queryInterface.bulkDelete('Products', null, {})
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    //FINDALL PRODUCT : success
    describe(`Successful Find All Products`, () => {
        test(`returning json of all data with status 200`, (done) => {
            request(app)
            .get('/products')
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('products', expect.any(Array))
                expect(response.status).toBe(200)
                done()
            })
        })
    })    

    // FINDONE PRODUCT: FAILED
    describe(`Failed Find One Product`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .get(`/products/${200}`)
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.status).toBe(400)
                done()
            })
        })
    }) 

    //CREATE PRODUCT: SUCCESS
    describe(`Successful Add New Product`, () => {
        test(`returning json of new data with status 201`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('newProduct', expect.any(Object))
                expect(response.status).toBe(201)
                done()
            })
        })
    })    

    //CREATE PRODUCT: ERROR -> empty string input
    describe(`Error add new product: empty input`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(case1)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Bad Request')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })
    //CREATE PRODUCT: ERROR -> null input
    describe(`Error add new product: null input`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(case2)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Bad Request')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })
    //CREATE PRODUCT: ERROR -> less than 0
    describe(`Error add new product: less than 0`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(case3)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Bad Request')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })
    //CREATE PRODUCT: ERROR -> not numeric
    describe(`Error add new product: not numeric`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(case4)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Bad Request')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })

    //CREATE PRODUCT: ERROR -> not authorized
    describe(`Error add new product: not authorized`, () => {
        test(`returning json of error with status 401`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', wrong_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'JsonWebTokenError')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(401)
                done()
            })
        })
    })
    
    //UPDATE PRODUCT: ERROR -> id does not exists
    describe(`Error update product`, () => {
        test(`returning json of error with status 404`, (done) => {
            request(app)
            .post(`/products/${200}`)
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Not Found')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(404)
                done()
            })
        })
    })

    //DELETE PRODUCT: ERROR -> id does not exists
    describe(`Error delete  product: null input`, () => {
        test(`returning json of error with status 404`, (done) => {
            request(app)
            .post(`/products/${200}`)
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Not Found')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(404)
                done()
            })
        })
    })
})

// //seed the origin admin again
// afterAll(done => {
//     queryInterface.bulkInsert('Users', [
//         {
//           username: 'admin',
//           email: 'admin@bricktiv8.com',
//           password: '$2a$10$8mG9.92ysuO9HeHsQl/Gt.ZCqeUrbw30rd3wxbwQGzvBtgJSAsbi2',
//           isAdmin: true
//         }
//       ], {})
//       .then(response => {
//           done()
//       })
//       .catch(err => {
//           done(err)
//       })
// })