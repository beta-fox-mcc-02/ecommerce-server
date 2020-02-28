const app = require('../app')
const request = require('supertest')
const {sequelize, User, Product, CategoryProduct, Category} = require('../models')
const { Op } = require('sequelize')
const {queryInterface} = sequelize

describe('Category Control Test', () => {
    let createdCategory;
    beforeAll(done => {
        Category.create({
            name: 'Nike',
            bg_img: 'https://images.pexels.com/photos/345415/pexels-photo-345415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        })
            .then(category => {
                createdCategory = category
                return Category.create({
                    name: 'Nikkee',
                    bg_img: 'https://images.pexels.com/photos/345415/pexels-photo-345415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                })
            })
            .then(category => {
                done()
            })
            .catch(err => {
                done(err)
            })
            
    })
    afterAll(done => {
        Category.destroy({
            where: {
                name: {
                    [Op.in]: ['Nike', 'Nikkee']
                }
            }
        })
            .then(result => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
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
                    .get(`/category/${createdCategory.id}`)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('msg', `success get category id ${createdCategory.id}`)
                        expect(res.body).toHaveProperty('data', expect.any(Object))
                        expect(res.body).toHaveProperty('data.id', createdCategory.id)
                        expect(res.body).toHaveProperty('data.name', 'Nike')
                        expect(res.body).toHaveProperty('data.bg_img', createdCategory.bg_img)
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