const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const {Admin, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const {createToken} = require('../helpers/jwt')
let productId = 0
let testToken = ''

describe('Product add test', () => {
    beforeAll((done) => {
        Admin.create({
            email : 'kiko@mail.com',
            password : 'admin123'
        })
        .then(res => {
            testToken = createToken(res.dataValues)
            done()
        })
        .catch(done)
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
          .then(response => {
            done()
          }).catch(err => done(err))
        queryInterface.bulkDelete('Admins', {})
          .then(response => {
            done()
          }).catch(err => done(err))
    })
    test('it should return new product', (done) => {
        request(app).post('/products/list')
            .set('token', testToken)
            .send({
                name : 'baju',
                image_url : '',
                price : 1000,
                stock : 1
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
    test('it should return error authorization "Only Admin Allowed to Modify Data', (done) => {
        Admin.create({
                email : 'koko@MediaList.com',
                password : 'admin123'
            })
            .then(res => {
                res.dataValues.id = res.dataValues.id + 1
                // testToken = createToken(res.dataValues)
                request(app).post(`/products/list`)
                    .send({
                        name : 'baju X',
                        image_url : '',
                        price : 10000,
                        stock : 10
                    })
                    .set('token', createToken(res.dataValues))
                    .end((err, response) => {
                        expect(err).toBe(null)
                        console.log(response.body)
                        expect(response.body).toHaveProperty('err', 'Only Admin Allowed to Modify Data')
                        expect(response.status).toBe(401)
                        done()
                    })
            })
            .catch(done)
    })
    test('it should return error validation "name cannot empty"', (done) => {
        request(app).post('/products/list')
            .set('token', testToken)
            .send({
                name : '',
                image_url : '',
                price : 1000,
                stock : 1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('name cannot empty')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "price must positive number"', (done) => {
        request(app).post('/products/list')
            .set('token', testToken)
            .send({
                name : '',
                image_url : '',
                price : -1,
                stock : 1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('price must positive number')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "stock must positive number"', (done) => {
        request(app).post('/products/list')
            .set('token', testToken)
            .send({
                name : '',
                image_url : '',
                price : 1000,
                stock : -1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('stock must positive number')
                expect(response.status).toBe(400)
                done()
            })
    })
})
describe('Product list test', () => {
    beforeAll((done) => {
        Admin.create({
            email : 'kiko@mail.com',
            password : 'admin123'
        })
        .then(res => {
            testToken = createToken(res.dataValues)
            done()
        })
        .catch(done)
        Product.create({
            name : 'baju',
            image_url : '',
            price : 1000,
            stock : 1
        })
        .then(res => {
            done()
        })
        .catch(done)
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Admins', {})
          .then(response => {
            done()
          }).catch(err => done(err))
    })
    test('it should return all product', (done) => {
        request(app).get('/products/list')
            .set('token', testToken)
            .end((err, response) => {
                
                expect(err).toBe(null)
                expect(response.body[0]).toHaveProperty('name')
                expect(response.body[0]).toHaveProperty('image_url')
                expect(response.body[0]).toHaveProperty('price')
                expect(response.body[0]).toHaveProperty('stock')
                expect(response.status).toBe(200)
                queryInterface.bulkDelete('Products', {})
                  .then(response => {
                    done()
                  }).catch(err => done(err))
                // done()
            })
    })
    test('it should return error "cannot find data"', (done) => {
        request(app).get('/products/list')
            .set('token', testToken)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('err', 'Cannot find Data')
                expect(response.status).toBe(404)
                done()
            })
    })
})
describe('Product list by Id test', () => {
    beforeAll((done) => {
        Admin.create({
            email : 'kiko@mail.com',
            password : 'admin123'
        })
        .then(res => {
            testToken = createToken(res.dataValues)
            done()
        })
        .catch(done)
        Product.create({
            name : 'baju',
            image_url : '',
            price : 1000,
            stock : 1
        })
        .then(res => {
            productId = res.id
            done()
        })
        .catch(done)
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Admins', {})
          .then(response => {
            done()
          }).catch(done)
        queryInterface.bulkDelete('Products', {})
          .then(response => {
              done()
          }).catch(done)
    })
    test('it should return error "cannot find data"', (done) => {
        request(app).get(`/products/${productId+1}/item`)
            .set('token', testToken)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('err', 'Cannot find Data')
                expect(response.status).toBe(404)
                done()
            })
    })
    test('it should return product', (done) => {
        request(app).get(`/products/${productId}/item`)
            .set('token', testToken)
            .end((err, response) => {
                expect(response.body).toHaveProperty('name')
                expect(response.body).toHaveProperty('image_url')
                expect(response.body).toHaveProperty('price')
                expect(response.body).toHaveProperty('stock')
                expect(response.status).toBe(200)
                done()
            })
    })
})
describe('product update test', () => {
    beforeAll((done) => {
        Admin.create({
            email : 'kiko@mail.com',
            password : 'admin123'
        })
        .then(res => {
            testToken = createToken(res.dataValues)
            return Product.create({
                name : 'baju',
                image_url : '',
                price : 1000,
                stock : 1
            })
        })
        .then(res => {
            productId = res.id
            done()
        })
        .catch(done)
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Admins', {})
          .then(response => {
            done()
          }).catch(err => done(err))
          queryInterface.bulkDelete('Products', {})
            .then(response => {
              done()
            }).catch(err => done(err))
    })
    test('it should return succes update with status 200', (done) => {
        request(app).put(`/products/${productId}/item`)
            .send({
                name : 'baju X',
                image_url : '',
                price : 10000,
                stock : 10
            })
            .set('token', testToken)
            .end((err, response) => {
                expect(err).toBe(null)
                // 
                expect(response.status).toBe(200)
                done()
            })
    })
    test('it should return error authorization "Only Admin Allowed to Modify Data', (done) => {
        Admin.create({
                email : 'koko@MediaList.com',
                password : 'admin123'
            })
            .then(res => {
                res.dataValues.id = res.dataValues.id + 1
                // testToken = createToken(res.dataValues)
                request(app).put(`/products/${productId}/item`)
                    .send({
                        name : 'baju X',
                        image_url : '',
                        price : 10000,
                        stock : 10
                    })
                    .set('token', createToken(res.dataValues))
                    .end((err, response) => {
                        expect(err).toBe(null)
                        console.log(response.body)
                        expect(response.body).toHaveProperty('err', 'Only Admin Allowed to Modify Data')
                        expect(response.status).toBe(401)
                        done()
                    })
            })
            .catch(done)
    })
    test('it should return error "Caonnot find data"', (done) => {
        request(app).put(`/products/${productId+1}/item`)
            .send({
                name : 'baju X',
                image_url : '',
                price : 10000,
                stock : 10
            })
            .set('token', testToken)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('err', 'Cannot find Data')
                expect(response.status).toBe(404)
                done()
            })
    })
    test('it should return error validation "name cannot empty"', (done) => {
        request(app).put(`/products/${productId}/item`)
            .set('token', testToken)
            .send({
                name : '',
                image_url : '',
                price : 1000,
                stock : 1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('name cannot empty')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "price must positive number"', (done) => {
        request(app).put(`/products/${productId}/item`)
            .set('token', testToken)
            .send({
                name : 'a',
                image_url : '',
                price : -1,
                stock : 1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('price must positive number')
                expect(response.status).toBe(400)
                done()
            })
    })
    test('it should return error validation "stock must positive number"', (done) => {
        request(app).put(`/products/${productId}/item`)
            .set('token', testToken)
            .send({
                name : '',
                image_url : '',
                price : 1000,
                stock : -1
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.err).toContain('stock must positive number')
                expect(response.status).toBe(400)
                done()
            })
    })
})
describe('product delete test', () => {
    beforeAll((done) => {
        Admin.create({
            email : 'kiko@mail.com',
            password : 'admin123'
        })
        .then(res => {
            testToken = createToken(res.dataValues)
            return Product.create({
                name : 'baju',
                image_url : '',
                price : 1000,
                stock : 1
            })
        })
        .then(res => {
            productId = res.id
            done()
        })
        .catch(done)
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Admins', {})
          .then(response => {
            done()
          }).catch(err => done(err))
          queryInterface.bulkDelete('Products', {})
            .then(response => {
              done()
            }).catch(err => done(err))
    })
    test('it should return delete status 200', (done) => {
        request(app).delete(`/products/${productId}/item`)
            .set('token', testToken)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.status).toBe(200)
                done()
            })
    })
    test('it should return error authorization "Only Admin Allowed to Modify Data', (done) => {
        Admin.create({
                email : 'koko@MediaList.com',
                password : 'admin123'
            })
            .then(res => {
                res.dataValues.id = res.dataValues.id + 1
                // testToken = createToken(res.dataValues)
                request(app).delete(`/products/${productId}/item`)
                    .set('token', createToken(res.dataValues))
                    .end((err, response) => {
                        expect(err).toBe(null)
                        console.log(response.body)
                        expect(response.body).toHaveProperty('err', 'Only Admin Allowed to Modify Data')
                        expect(response.status).toBe(401)
                        done()
                    })
            })
            .catch(done)
    })
    test('it should return status success 200', (done) => {
        request(app).delete(`/products/${productId-1}/item`)
            .set('token', testToken)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('err', 'Cannot find Data')
                expect(response.status).toBe(404)
                done()
            })
    })
})