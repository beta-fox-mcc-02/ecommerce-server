const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { Administrator, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
let access_token = null
let payload = {}

describe.only('Product Routes', () => {
    beforeAll((done) => {
        queryInterface.bulkDelete('Products', {})
          .then(response => {
            done()
          })
          .catch(err => done(err))
    })
    

    beforeEach((done) => {

        Administrator.create({
            username: 'andradhandra',
            email: 'andradhandra@mail.com',
            password: 'ridzaadhandra'
        })
            .then(user => {
                payload.id = user.id
                payload.email = user.email
                access_token = generateToken(payload)
                done()
            })
            .catch(err => done(err))
    })

    describe('Product Create', () => {
        test('it should return a product object with status 201', (done) => {
            request(app)
                .post('/products')
                .send({
                    name: 'juul',
                    image_url: 'https://www.happy-smoke.ch/media/image/a0/35/4d/juulezigaretteclassic.jpg',
                    price: 150000,
                    stock: 99
                })
                .end((err, response) => {
                    console.log(response.body, 'F T S')
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('name', 'juul')
                    expect(response.status).toBe(201)
                    done()
                })
        })

        test.only('it should be error when the input stock is a negative value', (done) => {
            //before create
            request(app)
                .post('/products')
                .set({ access_token })
                .send({
                    name: 'juul',
                    image_url: 'https://www.happy-smoke.ch/media/image/a0/35/4d/juulezigaretteclassic.jpg',
                    price: 150000,
                    stock: -99
                })
                .end((err, response) => {
                    console.log(response.body, '++++++++++++++++++++++++++')
                    expect(err).toBe(null)
                    expect(response.body.errors[0]).toBe('Stock cannot be less than 0')
                    expect(response.body.errors).toHaveLength(1)
                    expect(response.status).toBe(400)
                    done()
                })
        })
    })

    describe('Product Read', () => {
        test('it should bisa gitu', () => {

        })
    })

    describe('Product Update', () => {
        
    })

    describe('Product Delete', () => {
        
    })
})