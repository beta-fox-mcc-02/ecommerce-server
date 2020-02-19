const request = require('supertest')
const app = require('../app')
const { Product, User } = require('../models')
const { generateToken } = require('../helpers/jwt')


let token = ""
let productId = 0

describe('Product Testing', () => {
    beforeAll((done) => {
        let newObj = {
            email : "tamara@mail.com",
            password: "123456",
            RoleId: 1
        }
        
        User
        .create(newObj)
        .then(user => {
            let dataGetToken = {
                id : user.id,
                email : user.email,
                RoleId : user.RoleId
            }
            let access_token = generateToken(dataGetToken)
            console.log(access_token)
            token = access_token
            // done()
        })
        .then( createProduct => {
            return Product
                .create({
                    name: 'Hoodie',
                    image_url:'anystring',
                    price: 10000,
                    stock: 5,
                    RoleId: 1
                })
        })
        .then(product => {
            productId = product.id
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    afterAll((done) => {
        User 
            .destroy({
                where : {}
            })
            .then(cleanProduct => {
                return Product
                            .destroy({where : {}})
            })
            .then(productUserCleaned => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

// CREATE ======

    describe('Product create', () => {
        test('return object with status and data about data added', (done) => {
            request(app)
                .post('/products')
                .set('access_token', token)
                .send({
                    name: 'stroller',
                    image_url:'anystring',
                    price: 5000,
                    stock: 2,
                    RoleId: 1
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('data')
                    expect(response.body).toHaveProperty('msg')
                    expect(response.status).toBe(201)
                    done()
                })
        })
    })

    describe('Failed create because empty fill', () => {
        test('return object with status 400 ', (done) => {
            request(app)
                .post('/products')
                .set('access_token', token)
                .send({
                    name: '',
                    image_url:'',
                    price: 5000,
                    stock: 2,
                    RoleId: 1
                })
                .end((err, response) => {
                    // console.log(response.body)
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('errors', expect.any(Array))
                    expect(response.body).toHaveProperty('msg', `Validation Error`)
                    expect(response.status).toBe(400)
                    done()
                })
        })
    })


    describe('Product create error because has np token', () => {
        test('return object with status 500 ', (done) => {
            request(app)
                .post('/products')
                .send({
                    name: 'Gelas kaca',
                    image_url:'kjhsdkhaskjd',
                    price: 5000,
                    stock: 2,
                    RoleId: 1
                })
                .end((err, response) => {
                    // console.log(response.body)
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error','JsonWebTokenError')
                    expect(response.status).toBe(404)
                    done()
                })
        })
    })


// // READ ALL ==========


    describe('Product read all product', () => {
        test('return object with status 200', (done) => {
            request(app)
                .get('/products')
                .set('access_token', token)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('data', expect.any(Array))
                    expect(response.body).toHaveProperty('msg', 'success find all data')
                    expect(response.status).toBe(200)
                    done()
                })
        })
    })


    describe('Product read all product error because has no token', () => {
        test('return object with status 200', (done) => {
            request(app)
                .get('/products')
                .end((err, response) => {
                    // console.log(response.body)
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error','JsonWebTokenError')
                    expect(response.status).toBe(404)
                    done()
                })
        })
    })
    
// // READ ONE
    
    describe('Product find one', () => {
        test('return object of product by id with status 200', (done) => {
            request(app)
                .get(`/products/${productId}`)
                .set('access_token', token)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('data')
                    expect(response.body).toHaveProperty('msg', 'find one success')
                    expect(response.status).toBe(200)
                    done()
                })
        })
    })

    describe('Product find one error because no id', () => {
        test('return object of product by id with status 404', (done) => {
            request(app)
                .get(`/products/90909`)
                .set('access_token', token)
                .end((err, response) => {

                    // console.log(response.body)
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error', 'data not found')
                    expect(response.status).toBe(404)
                    done()
                })
        })
    })
    
// // UPDATE 

    describe('Product update', () => {
        test('return objet of new up to date data and status 201', (done) => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send({
                    name: 'Update bara',
                    image_url:'anystring',
                    price: 5000,
                    stock: 2,
                    RoleId: 1
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('data')
                    expect(response.body).toHaveProperty('msg', 'update success')
                    expect(response.status).toBe(201)
                    done()
                })
        })
    })

    describe('Product update', () => {
        test('return objet of new up to date data and status 201', (done) => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send({
                    name: 'Update bara',
                    image_url:'anystring',
                    price: 5000,
                    stock: 2,
                    RoleId: 1
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('data')
                    expect(response.body).toHaveProperty('msg', 'update success')
                    expect(response.status).toBe(201)
                    done()
                })
        })
    })
   
// //DELETE

    describe('Product delete', () => {
        test('return objet status 200', (done) => {
            request(app)
                .delete(`/products/${productId}`)
                .set('access_token', token)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('msg', 'delete success')
                    expect(response.status).toBe(200)
                    done()
                })
        })
    })
})