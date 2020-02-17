const app = require('../app')
const request = require('supertest')

describe(`This is product CRUD test`, () => {
    describe(`Product success case`, () => {
        test(`product create expectation`, (done) => {
            request(app)
            .post('/product/create')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwiaWF0IjoxNTgxOTQ0NDMxfQ.zQp0dbelTFT2ljudvJc9ibgCAOG815IUSnKraKoLGcw')
            .send({
                name: 'Bag',
                imageUrl: 'bit.ly/image.jpg',
                price: 10000,
                stock: 10
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.body.message).toBe('successfully added Bag to database')
                expect(response.status).toBe(201)
                done()
            })
        })
        test(`product show all expectation`, (done) => {
            request(app)
            .get('/product/findall')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwiaWF0IjoxNTgxOTQ0NDMxfQ.zQp0dbelTFT2ljudvJc9ibgCAOG815IUSnKraKoLGcw')
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('products')
                expect(response.status).toBe(200)
                done()
            })
        })
        test(`product delete expectation`, (done) => {
            request(app)
            .delete('/product/delete/:id')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwiaWF0IjoxNTgxOTQ0NDMxfQ.zQp0dbelTFT2ljudvJc9ibgCAOG815IUSnKraKoLGcw')
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('products')
                expect(response.status).toBe(200)
                done()
            })
        })
    })

    describe(`Product error case`, () => {
        test(`unidentified credentials / broken token detected`, (done) => {
            request(app)
            .post('/product/create')
            .set('token', 'yJhbIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwiaWF0IjoxNTgxOTI4NjQzfQ.6dnI1ajyTtFxGbrkwctcDJnmQ0Xn7ttjEwk9OI5DEgU')
            .send({
                name: 'Bag',
                imageUrl: 'bit.ly/image.jpg',
                price: 10000,
                stock: 10
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.body.message).toBe('invalid token')
                expect(response.status).toBe(401)
                done()
            })
        })
        test(`validation error on product`, (done) => {
            request(app)
            .post('/product/create')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwiaWF0IjoxNTgxOTQ0NDMxfQ.zQp0dbelTFT2ljudvJc9ibgCAOG815IUSnKraKoLGcw')
            .send({
                name: 'Bag',
                imageUrl: 'bit.ly/image.jpg',
                price: -1000,
                stock: -2
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(400)
                done()
            })
        })
        test(`product show all error expectation`, (done) => {
            request(app)
            .get('/product/findal')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwiaWF0IjoxNTgxOTQ0NDMxfQ.zQp0dbelTFT2ljudvJc9ibgCAOG815IUSnKraKoLGcw')
            .end((err, response) => {
                expect(err).toBe(null)
                console.log(response.body)
                expect(response.body).not.toHaveProperty('products')
                expect(response.status).toBe(404)
                done()
            })
        })
    })
})