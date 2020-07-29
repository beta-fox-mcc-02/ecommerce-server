const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User ,Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const  jwt = require('../helper/jwt')

describe('Check ',() => {
    var token ;
    var id ;
    beforeAll((done) => {
        User.create({
            username : "uwu",
            email : 'uwu@gmail.com',
            password : "12345678",
            role : 1
        })
            .then(response => {
                let input = {
                    email : response.email,
                    password : response.password
                }
                token = jwt.generate(input)
                done()
            })
            .catch(err =>{
                done(err)
            })
    })
    afterAll((done) => {
        queryInterface.bulkDelete("Users", {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    beforeAll((done) => {
        Product.create({
            name : 'monbil',
            description : 'bisa jalan ',
            price : 1.500,
            image_url : 'wwwwwwwwwww',
            stock : 3
        })
            .then(response => {
                id = response.id
                done()
            })
            .catch(err =>{
                done(err)
            })
    })
    afterAll((done) => {
        queryInterface.bulkDelete("Products", {})
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    describe('create', () => {
        test('succses created and status 201' ,(done) => {
            request(app)
            .post("/create")
            .set('token',token)
            .send({
                name : 'monbil',
                description : 'bisa jalan ',
                price : 1.500,
                image_url : 'wwwwwwwwwww',
                stock : 3
            })
            .end((err,response) => {
                // console.log(token)
                expect(err).toBe(null)
                expect(response.body).toHaveProperty("data",expect.any(Object))
                // expect(response.body).toHaveProperty("data.name",expect.any(String))
                // expect(response.body).toHaveProperty("data.description",expect.any(String))
                // expect(response.body).toHaveProperty("data.image_url",expect.any(String))
                // expect(response.body).toHaveProperty("data.price",expect.any(Number))
                // expect(response.body).toHaveProperty("data.stock",expect.any(Number))
                done()
            })
        })
        test('error create email is empty response 400',(done) => {
            request(app)
            .post("/create")
            .send({
                description : 'bisa jalan ',
                price : 1.500,
                image_url : 'wwwwwwwwwww',
                stock : 3
            })
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message','please insert title')
                expect(response.status).toBe(400)
                done()
            })
        })
        test('error create Description empty response 400',(done) => {
            request(app)
            .post("/create")
            .send({
                name : 'monbil',
                price : 1.500,
                image_url : 'wwwwwwwwwww',
                stock : 3
            })
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(400)
                done()
            })
        })
        test('error create price less than zero response 400',(done) => {
            request(app)
            .post("/create")
            .send({
                name : 'monbil',
                description : 'bisa jalan ',
                price : -1.500,
                image_url : 'wwwwwwwwwww',
                stock : 3
            })
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message','Please insert valid price')
                expect(response.status).toBe(400)
                done()
            })
        })
        test('error create stock must be more than 0 response 400',(done) => {
            request(app)
            .post("/create")
            .send({
                name : 'monbil',
                description : 'bisa jalan ',
                price : 1.500,
                image_url : 'wwwwwwwwwww',
                stock : -1
            })
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(400)
                done()
            })
        })
        test('error create and status 400 all errors',(done) => {
            request(app)
            .post('/create')
            .send({
                price : -1999,
                stock : 0,
                image_url : 'www.uwuuwuw.com'
            })
            .set('token',token)
            .end((err , response ) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(400)
                done()
            })
        })
    })
    describe('delete',() => {
        test('succses delete',(done) => {
            request(app)
            .delete(`/${id}`)
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(200)
                done()
            })
        })
        test('eror delete',(done) => {
            request(app)
            .delete(`/9999999999999999999999999999999999999999999999`)
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(404)
                done()
            })
        })
        test('delete is not authentication',(done) => {
            request(app)
            .delete(`/${id}`)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.body).toHaveProperty('status')
                done()
            })
        })
    })
    describe('update',() => {
        test('succses created and status 201' ,(done) => {
            request(app)
            .put(`/${id}`)
            .send({
                name : 'monbil',
                description : 'bisa jalan ',
                price : 1.500,
                image_url : 'wwwwwwwwwww',
                stock : 3
            })
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(200)
                done()
            })
        })
        test('error update price less than zero response 400',(done) => {
            request(app)
            .put(`/${id}`)
            .send({
                name : 'monbil',
                description : 'bisa jalan ',
                price : -1.500,
                image_url : 'wwwwwwwwwww',
                stock : 3
            })
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(400)
                done()
            })
        })
        test('error update stock must be more than 0 response 400',(done) => {
            request(app)
            .put(`/${id}`)
            .send({
                name : 'monbil',
                description : 'bisa jalan ',
                price : 1.500,
                image_url : 'wwwwwwwwwww',
                stock : -1
            })
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(400)
                done()
            })
        })
        test('succses error authentication and status 400' ,(done) => {
            request(app)
            .put(`/${id}`)
            .send({
                name : 'monbil',
                description : 'bisa jalan ',
                price : 1.500,
                image_url : 'wwwwwwwwwww',
                stock : 3
            })
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty("message")
                expect(response.body).toHaveProperty('status')
                done()
            })
        })
    })
    describe('readAll',() => {
        test('find all succses',(done) => {
            request(app)
            .get('/')
            .set("token",token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty("data",expect.any(Object))
                expect(response.status).toBe(200)
                done()
            })
        })
    })
    describe('readOne',() => {
        test.only('findOne succes ',(done) => {
            request(app)
            .get(`/${id}`)
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty("data",expect.any(Object))
                expect(response.status).toBe(200)
                done()
            })
        })
        test('findOne error',(done) => {
            request(app)
            .get(`/999999999999`)
            .set('token',token)
            .end((err,response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message')
                expect(response.status).toBe(404)
                done()
            })
        })
    })
})