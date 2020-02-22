const app = require('../app')
const request = require('supertest')
const {sequelize, User, Product, CategoryProduct, Category} = require('../models')
const {queryInterface} = sequelize

describe('Category Control Test', () => {
    describe('Get All Categories', () => {
        describe('Success Response', () => {
            test('Get all categories', done => {
                request(app)
                    .get('/category')
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('msg', 'success get all categories')
                        expect(res.body).toHaveProperty('data', expect.any(Array))
                        done()
                    })
            })
        })
    })
    describe('Get All Categories', () => {
        describe('Success Response', () => {
            test('Get one category', done => {
                request(app)
                    .get('/category/3')
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('msg', 'success get category id 3')
                        expect(res.body).toHaveProperty('data', expect.any(Object))
                        done()
                    })
            })
        })
        describe('Error Response', () => {
            test('Category not found', done => {
                request(app)
                    .get('/category/99999999')
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(404)
                        expect(res.body).toHaveProperty('msg', 'category not found')
                        done()
                    })
            })
        })
    })
})