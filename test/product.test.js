const app = require('../app')
const request = require('supertest')
const {sequelize, User, Product} = require('../models')
const {queryInterface} = sequelize
const {generateToken} = require('../helpers/jwt')

describe('Product CRUD Features, admin only', () => {
    let access_token_admin;
    let access_token_user;
    let product_id;
    beforeAll(done => {
        Product.create({
            name: 'Converse 123',
            description: 'First Converse in 2020',
            image_url: '',
            price: 100000,
            stock: 100
        })
            .then(product => {
                product_id = product.id
                return User.create({
                    name: 'admin',
                    email: 'admin@mail.com',
                    password: '321321321',
                    role: 'admin'
                })
            })
            .then(admin => {
                access_token_admin = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role
                })
                return User.create({
                    name: 'lmao',
                    email: 'lmao@mail.com',
                    password: '00000000',
                    role: 'user'
                })
            })
            .then(user => {
                access_token_user = generateToken({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                })
                done()
            })
            .catch(err => {
                done(err)
            })
        
    })
    afterAll(done => {
        let deleteUser = queryInterface.bulkDelete('Users', null)
        let deleteProduct = queryInterface.bulkDelete('Products', null)
        let deleteCategoryProduct = queryInterface.bulkDelete('CategoryProducts', null)
        Promise.all([deleteUser, deleteProduct, deleteCategoryProduct])
            .then(results => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    describe('Create New Project', () => {
        describe('Success Response', () => {
            describe('it should send success message with status 201, and the created data', () => {
                test('Create new product success with description', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: 'Nike Free 202',
                            description: "Running shoes for all generation, affordable price, and many color choices",
                            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                            price: 453210,
                            stock: 100
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('msg', 'product created successfully')
                            expect(res.body).toHaveProperty('data.name', expect.any(String))
                            expect(res.body).toHaveProperty('data.description', expect.any(String))
                            expect(res.body).toHaveProperty('data.image_url', expect.any(String))
                            expect(res.body).toHaveProperty('data.price', expect.any(Number))
                            expect(res.body).toHaveProperty('data.stock', expect.any(Number))
                            done()
                        })
                        
                })
                test('Create new product success, even without description', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: 'Nike Free 203',
                            description: "",
                            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                            price: 251210,
                            stock: 1000
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('msg', 'product created successfully')
                            expect(res.body).toHaveProperty('data.name', expect.any(String))
                            expect(res.body).toHaveProperty('data.description', expect.any(String))
                            expect(res.body).toHaveProperty('data.image_url', expect.any(String))
                            expect(res.body).toHaveProperty('data.price', expect.any(Number))
                            expect(res.body).toHaveProperty('data.stock', expect.any(Number))
                            done()
                        })
                })
            })
        })
        describe('Error Response', () => {
            describe('it should send error message and send status 401', () => {
                test('no user', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: 'North Star',
                            description: '',
                            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                            price: 251210,
                            stock: 1000
                        })
                        .end((err, res) => {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('msg', 'login required')
                            done()
                        })
                })
                test('user role is not admin', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: 'North Star',
                            description: '',
                            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                            price: 251210,
                            stock: 1000
                        })
                        .set('access_token', access_token_user)
                        .end((err, res) => {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('msg', 'authorized only')
                            done()
                        })
                })
            })
            describe('it should send error message and send status 400', () => {
                test('no product name input', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: '',
                            description: '',
                            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                            price: 251210,
                            stock: 1000
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'required product name')
                            done()
                        })
                })
                test('price input not allow null', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: 'Nike Air',
                            description: '',
                            image_url: '',
                            stock: 1000
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'required price tag')
                            done()
                        })
                })
                test('price input is below minimum requirement', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: 'Nike Aiiir',
                            description: '',
                            image_url: '',
                            price: -10,
                            stock: 1000
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'Minimum price is 0')
                            done()
                        })
                })
                test('stock number must be integer', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: 'Nike Aiiir',
                            description: '',
                            image_url: '',
                            price: 321000,
                            stock: 10.3
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'No decimal stock')
                            done()
                        })
                })
                test('stock input is below minimum requirement', done => {
                    request(app)
                        .post('/product')
                        .send({
                            name: 'Converse',
                            description: '',
                            image_url: '',
                            price: 321000,
                            stock: -9
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'Minimum stock is 0')
                            done()
                        })
                })
            })
        })
    })
    describe('Get All Product', () => {
        describe('Success Response', () => {
          test('it should get data of products and send status 200', done => {
            request(app)
            .get('/product')
            .end((err, res) => {
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('msg', 'get all product')
                expect(res.body).toHaveProperty('data', expect.any(Array))
                done()
            })
          })  
        })
    })
    describe('Get One Product', () => {
        describe('Success Response', () => {
          test('it should get data of one product and send status 200', done => {
            request(app)
            .get(`/product/${product_id}`)
            .end((err, res) => {
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('msg', 'get the product')
                expect(res.body).toHaveProperty('data.name', expect.any(String))
                expect(res.body).toHaveProperty('data.description', expect.any(String))
                expect(res.body).toHaveProperty('data.image_url', expect.any(String))
                expect(res.body).toHaveProperty('data.price', expect.any(Number))
                expect(res.body).toHaveProperty('data.stock', expect.any(Number))
                done()
            })
          })  
        })
        describe('Error Response', () => {
            test('it should send error message and send status 404', done => {
                request(app)
                .get('/product/1000000000')
                .end((err, res) => {
                    expect(res.status).toBe(404)
                    expect(res.body).toHaveProperty('msg', 'product not found')
                    done()
                })
            })
        })
    })
    describe('Update Product', () => {
        describe('Success Response', () => {
            test('it should send success message and send status 200', done => {
                request(app)
                        .put(`/product/${product_id}`)
                        .send({
                            name: 'Nike Ground Running 101',
                            description: "Running shoes for all ground status, affordable price, many color choices, and very durable",
                            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                            price: 500000,
                            stock: 50
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {                            
                            expect(err).toBe(null)
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('msg', 'product updated successfully')
                            expect(res.body).toHaveProperty('data.name', expect.any(String))
                            expect(res.body).toHaveProperty('data.description', expect.any(String))
                            expect(res.body).toHaveProperty('data.image_url', expect.any(String))
                            expect(res.body).toHaveProperty('data.price', expect.any(Number))
                            expect(res.body).toHaveProperty('data.stock', expect.any(Number))
                            done()
                        })
            })
        })
        describe('Error Response', () => {
            describe('it should send error message and send status 401', () => {
                test('no user', done => {
                    request(app)
                        .put(`/product/${product_id}`)
                        .send({
                            name: 'North Star',
                            description: '',
                            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                            price: 251210,
                            stock: 1000
                        })
                        .end((err, res) => {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('msg', 'login required')
                            done()
                        })
                })
                test('user role is not admin', done => {
                    request(app)
                        .put(`/product/${product_id}`)
                        .send({
                            name: 'North Star',
                            description: '',
                            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                            price: 251210,
                            stock: 1000
                        })
                        .set('access_token', access_token_user)
                        .end((err, res) => {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('msg', 'authorized only')
                            done()
                        })
                })
            })
            describe('it should send error message and send status 400', () => {
                test('no name input null', done => {
                    request(app)
                        .put(`/product/${product_id}`)
                        .send({
                            name: '',
                            description: '',
                            image_url: '',
                            price: 200000,
                            stock: 10
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'required product name')
                            done()
                        })
                })
                test('price input is below minimum requirement', done => {
                    request(app)
                        .put(`/product/${product_id}`)
                        .send({
                            name: 'Nike Aiiir',
                            description: '',
                            image_url: '',
                            price: -10,
                            stock: 1000
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'Minimum price is 0')
                            done()
                        })
                })
                test('stock number must be integer', done => {
                    request(app)
                        .put(`/product/${product_id}`)
                        .send({
                            name: 'Nike Aiiir',
                            description: '',
                            image_url: '',
                            price: 321000,
                            stock: 10.3
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'No decimal stock')
                            done()
                        })
                })
                test('stock input is below minimum requirement', done => {
                    request(app)
                        .put(`/product/${product_id}`)
                        .send({
                            name: 'Converse',
                            description: '',
                            image_url: '',
                            price: 321000,
                            stock: -9
                        })
                        .set('access_token', access_token_admin)
                        .end((err, res) => {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('msg', 'Minimum stock is 0')
                            done()
                        })
                })
            })
        })
    })
    describe('Delete Product', () => {
        describe('Success Response', () => {
            test('it should send message and send status 200', done => {
                request(app)
                    .delete(`/product/${product_id}`)
                    .set('access_token', access_token_admin)
                    .end((err, res) => {
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('msg', 'product deleted successfully')
                        done()
                    })
            })
        })
        describe('Error Response', () => {
            describe('it should send error message and send status 401', () => {
                test('no user', done => {
                    request(app)
                        .delete(`/product/${product_id}`)
                        .end((err, res) => {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('msg', 'login required')
                            done()
                        })
                })
                test('user role is not admin', done => {
                    request(app)
                        .delete(`/product/${product_id}`)
                        .set('access_token', access_token_user)
                        .end((err, res) => {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('msg', 'authorized only')
                            done()
                        })
                })
            })
            describe('it should send error message and send status 404', () => {
                test('no product to delete', done => {
                    request(app)
                            .delete(`/product/999999999999`)
                            .set('access_token', access_token_admin)
                            .end((err, res) => {
                                expect(res.status).toBe(404)
                                expect(res.body).toHaveProperty('msg', 'product not found')
                                done()
                            })
                })
            })
        })
    })
})