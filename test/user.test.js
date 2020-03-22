const request = require('supertest')
const app = require('../app')
const {User} = require('../models')

describe('Admin Routes', () => {

    afterAll((done) => {
        User.destroy({
            where : {}
        })
        .then(response => {
          done()
        }).catch(err => done(err))
    })

    describe('Admin Registration Test', () => {
        test('it should return new object, status 201, and Admin data registered', (done) => {
            request(app)
                .post('/registerAdmin')
                .send({
                    email: "mar@mmy.com",
                    password: "123456",
                    RoleId : 1
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('id', expect.any(Number))
                    expect(response.body).toHaveProperty('email')
                    expect(response.status).toBe(201)
                    done()
                })
        })
    })


    describe('Admin Registration Wrong Format Email', () => {
        test('it should return object with status 400', (done) => {
            request(app)
            .post('/registerAdmin')
            .send({
                email: "tamara@yahoomm",
                password: "123456"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors')
                expect(response.body.errors).toEqual(expect.arrayContaining([ 'Input is not email format' ]));
                expect(response.status).toBe(400)
                done()
            })
        })
    })


    describe('Admin registration less than 2 or more than 8 ', () => {
        test('it should return object with status 400', (done) => {
            request(app)
            .post('/registerAdmin')
            .send({
                email: "tamara@yaho.omm",
                password: "1"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors')
                expect(response.body.errors).toEqual(expect.arrayContaining(['Password length must between 2 and 8']));
                expect(response.status).toBe(400)
                done()
            })
        })
    })

    describe('Admin registration not input email', () => {
        test('it should return object with status 400 and erorr ', (done) => {
            request(app)
            .post('/registerAdmin')
            .send({
                email: "",
                password: "123456"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors')
                expect(response.body.errors).toEqual(expect.arrayContaining([ 'You have to register an email']));
                expect(response.status).toBe(400)
                done()
            })
        })
    })

    describe('Admin registration not input password', () => {
        test('it should return object with status 400 and erorr ', (done) => {
            request(app)
            .post('/registerAdmin')
            .send({
                email: "taza@mail.dom",
                password: ""
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors')
                expect(response.body.errors).toEqual(expect.arrayContaining([ 'You have to set your password']));
                expect(response.status).toBe(400)
                done()
            })
        })
    })

    describe('Admin registration not input password', () => {
        test('it should return object with status 400 and erorr ', (done) => {
            request(app)
            .post('/registerAdmin')
            .send({
                email: "",
                password: ""
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors')
                expect(response.body.errors).toEqual(expect.arrayContaining(['You have to register an email', 'You have to set your password']));
                expect(response.status).toBe(400)
                done()
            })
        })
    })    
    
    describe('Admin registration less than 2 or more than 8 and wrong format email ', () => {
        test('it should return object with status 400 and erorrs ', (done) => {
            request(app)
            .post('/registerAdmin')
            .send({
                email: "tamara@yahomm",
                password: "1"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors')
                expect(response.body.errors).toEqual(expect.arrayContaining([ 'Input is not email format', 'Password length must between 2 and 8']));
                expect(response.status).toBe(400)
                done()
            })
        })
    })

    describe('Admin Login Succeess', () => {
        test('it should return new object and access_token in it', (done) => {
            request(app)
                .post('/loginAdmin')
                .send({
                    email: 'mar@mmy.com',
                    password: '123456'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('access_token')
                    expect(response.status).toBe(200)
                    done()
                })
        })
    })

    describe('Admin login failed because wrong password or wrong email', () => {
        test('it should return new object with status 404', (done) => {
            request(app)
                .post('/loginAdmin')
                .send({
                    email: 'mara@mail.com',
                    password : '08786776'
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error', 'Invalid password / email!')
                    expect(response.status).toBe(404)
                    done()
                })
        })
    })

    describe('Admin login failed because sequelize error', () => {
        test('it should return new object with status 404 and error', (done) => {
            request(app)
                .post('/loginAdmin')
                .send({
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error', 'Error')
                    expect(response.status).toBe(404)
                    done()
                })
        })
    })
})
