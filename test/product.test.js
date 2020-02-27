const request = require('supertest')
const app = require('../app')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const { createToken } = require('../helpers/jwt')

let token = ''
let id = ''

describe('Administrator test section', () => {

    beforeAll((done) => {

        User.create({
            username: 'kadiso',
            email: 'kadiso@mail.com',
            password: '12345',
            role: true
        })
            .then(data => {
                token = createToken(data.id)
                return Product.create({
                    name: 'crayon sinchan',
                    image_url: 'https://ssvr.bukukita.com/babacms/displaybuku/94071_f.jpg',
                    author: 'Yoshito Usui',
                    price: 17000,
                    stock: 5
                })
            })
            .then(data => {
                id = data.id
                done()
            })
            .catch(err => done(err))

    })

    afterAll((done) => {

        queryInterface.bulkDelete('Products', null, {})
            .then(data => {
                return queryInterface.bulkDelete('Users', null, {})
            })
            .then(data => done())
            .catch(err => done(err))

    })

    describe('Create product test section', () => {

        describe('Create success response', () => {

            test('Create success response', (done) => {

                request(app)
                    .post('/admin/product')
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: 'fujiko f fujio',
                        price: 15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(201)
                        expect(response.body.data).toHaveProperty('name', (expect.any(String)))
                        expect(response.body.data).toHaveProperty('author', (expect.any(String)))
                        expect(response.body.data).toHaveProperty('image_url', (expect.any(String)))
                        expect(response.body.data).toHaveProperty('price', (expect.any(Number)))
                        expect(response.body.data).toHaveProperty('stock', (expect.any(Number)))
                        expect(response.body.message).toContain('success create product')
                        done()
                    })

            })

        })

        describe('Create failed response', () => {

            test('Create error response because name empty', (done) => {

                request(app)
                    .post('/admin/product')
                    .set('token', token)
                    .send({
                        name: '',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: 'fujiko f fujio',
                        price: 15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'name cant be empty')
                        done()
                    })

            })

            test('Create error response because image_url empty', (done) => {

                request(app)
                    .post('/admin/product')
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: '',
                        author: 'fujiko f fujio',
                        price: 15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'image url cant be empty')
                        done()
                    })

            })

            test('Create error response because price less than 0', (done) => {

                request(app)
                    .post('/admin/product')
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: 'fujiko f fujio',
                        price: -15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'price cant be less than 0')
                        done()
                    })

            })

            test('Create error response because stock less than 0', (done) => {

                request(app)
                    .post('/admin/product')
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: 'fujiko f fujio',
                        price: 15000,
                        stock: -10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'stock cant be less than 0')
                        done()
                    })

            })

            test('Create product error because author name empty', (done) => {

                request(app)
                    .post(`/admin/product`)
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: '',
                        price: 15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body.message).toContain('author Name cant be empty')
                        done()
                    })

            })

        })

    })

    describe('Find all product test section', () => {

        describe('Find all success response', () => {

            test('Find all success response', (done) => {

                request(app)
                    .get('/')
                    .set('token', token)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('data', (expect.any(Array)))
                        done()
                    })

            })

        })

    })

    describe('Update product test section', () => {

        describe('Update product success response', () => {

            test('Update product success response', (done) => {

                request(app)
                    .put(`/admin/product/${id}`)
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: 'fujiko f fujio',
                        price: 15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body.data).toHaveProperty('name', (expect.any(String)))
                        expect(response.body.data).toHaveProperty('author', (expect.any(String)))
                        expect(response.body.data).toHaveProperty('image_url', (expect.any(String)))
                        expect(response.body.data).toHaveProperty('price', (expect.any(Number)))
                        expect(response.body.data).toHaveProperty('stock', (expect.any(Number)))
                        expect(response.body.message).toContain('success update product')
                        done()
                    })
            })

        })

        describe('Update product error response', () => {

            test('Update product error because name empty', (done) => {

                request(app)
                    .put(`/admin/product/${id}`)
                    .set('token', token)
                    .send({
                        name: '',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: 'fujiko f fujio',
                        price: 15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body.message).toContain('name cant be empty')
                        done()
                    })

            })

            test('Update product error because image url empty', (done) => {

                request(app)
                    .put(`/admin/product/${id}`)
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: '',
                        author: 'fujiko f fujio',
                        price: 15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body.message).toContain('image url cant be empty')
                        done()
                    })

            })

            test('Update product error because price less than 0', (done) => {

                request(app)
                    .put(`/admin/product/${id}`)
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: 'fujiko f fujio',
                        price: -15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body.message).toContain('price cant be less than 0')
                        done()
                    })

            })

            test('Update product error because stock less than 0', (done) => {

                request(app)
                    .put(`/admin/product/${id}`)
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: 'fujiko f fujio',
                        price: 15000,
                        stock: -10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body.message).toContain('stock cant be less than 0')
                        done()
                    })

            })

            test('Update product error because author name empty', (done) => {

                request(app)
                    .put(`/admin/product/${id}`)
                    .set('token', token)
                    .send({
                        name: 'doraemon vol.40',
                        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81lWONV4PvL.jpg',
                        author: '',
                        price: 15000,
                        stock: 10
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body.message).toContain('author Name cant be empty')
                        done()
                    })

            })

        })

    })

    describe('Delete product test section', () => {

        describe('Delete product success response', () => {

            test('Delete product success response', (done) => {

                request(app)
                    .delete(`/admin/product/${id}`)
                    .set('token', token)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body.message).toContain('success delete product')
                        done()
                    })

            })

        })

    })

})