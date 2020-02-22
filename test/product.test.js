const request = require('supertest')
const app = require('../app')
const { sequelize, Admin, Product } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
let token 
let idProduct

describe('Product Router', () => {

    beforeAll((done) => {
        queryInterface.bulkDelete('Products', {})
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
            return queryInterface.bulkDelete('Admins', {})
        })
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    beforeEach((done) => {
        let payload = {
            name : "Hikmani Syriful",
            email : "syariful@gmail.com",
            password : "12345678"
        }
        Admin.create(payload)
            .then(admin => {
                let adminData = {
                    id : admin.id,
                    name : admin.name,
                    email : admin.email
                }
                token = generateToken(adminData)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('Add new Product', () => {
        test('It should return new object containing attributes of new product which added and status 201', (done) => {
            request(app)
                .post('/products')
                .set({
                    token : token
                })
                .send({
                    name : "Kemaja kotak-kotak",
                    image_url : "https://id-live-01.slatic.net/p/a1a40768ad937837ada6f4e4a5e75824.jpg",
                    price : 300000,
                    stock : 10
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('name')
                    expect(response.body).toHaveProperty('image_url')
                    expect(response.body).toHaveProperty('price')
                    expect(response.body).toHaveProperty('stock')
                    expect(response.status).toBe(201)
                    done()
                })
        })

        test('It should return error messages from SequelizeValidationError and status 400', (done) => {
            request(app)
                .post('/products')
                .set({
                    token : token
                })
                .send({
                    name : "",
                    image_url : "https://id-live-01.slatic.net/p/a1a40768ad937837ada6f4e4a5e75824.jpg",
                    price : -200,
                    stock : -1
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('errors')
                    expect(response.status).toBe(400)
                    done()
                })
        })
    })

    describe('Get products', () => {
       
        describe('status 200 findAll', () => {
            beforeEach((done) => {
                let payload = {
                    name : "Sweater",
                    image_url : "https://www.bbo-store.com/wp-content/uploads/2019/02/1-29.jpg",
                    price : 250000,
                    stock : 10
                }
                Product.create(payload)
                    .then(item => {
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })
    
            test("It should return array of object and status 200", (done) => {
                
                request(app)
                    .get('/products')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('dataItems', expect.any(Array))
                        expect(response.status).toBe(200)
                        done()
                    })
            })
        })

        test("It should return object containing message NOT FOUND", (done) => {
            request(app)
                .get('/products')
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error')
                    expect(response.status).toBe(404)
                    done()
                })
        })
    })

    describe("Update Item By Id", () => {
        describe('update success and status 200', () => {
            beforeEach((done) => {
                let payload = {
                    name : "Kemaja batik",
                    image_url : "https://id-live-01.slatic.net/p/a1a40768ad937837ada6f4e4a5e75824.jpg",
                    price : 300000,
                    stock : 10
                }
                Product.create(payload)
                    .then(item => {
                        idProduct = item.id
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })
    
            test("It should return array of array and status 200", (done) => {
                request(app)
                    .put(`/products/${idProduct}`)
                    .set({
                        token : token
                    })
                    .send({
                        name : "Kemaja Baru",
                        image_url : "https://id-live-01.slatic.net/p/a1a40768ad937837ada6f4e4a5e75824.jpg",
                        price : 20000,
                        stock : 5
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('data', expect.any(Array))
                        expect(response.status).toBe(200)
                        done()
                    })
            })
        })
    })

    describe("Delete item based on Id", () => {
        let idItem
        describe("Delete Success and status 200", () => {
            beforeEach((done) => {
                let payload = {
                    name : "Kemaja batik",
                    image_url : "https://id-live-01.slatic.net/p/a1a40768ad937837ada6f4e4a5e75824.jpg",
                    price : 300000,
                    stock : 10
                }
                Product.create(payload)
                    .then(item => {
                        idItem = item.id
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })

            test("It should return array of array and status 200", (done) => {
                request(app)
                    .delete(`/products/${idItem}`)
                    .set({
                        token : token
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('data')
                        expect(response.status).toBe(200)
                        done()
                    })
            })
        })
    })
    
})