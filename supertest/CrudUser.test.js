const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User , sequelize } = require('../models')
const { queryInterface } = sequelize
const  jwt = require('../helper/jwt')

describe.skip("Check Register" , () => {
    afterEach((done) => {
        queryInterface.bulkDelete("Users", {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    describe('Succses Register' , () => {
        test('Its should be return new user and status 201', (done) => {
            request(app)
                .post('/register')
                .send({
                    username : "uwu",
                    email : 'uwu@gmail.com',
                    password : "123456789"
                })
                .end((err,response) => {
                    expect(err).toBe(null),
                    expect(response.body).toHaveProperty('email','uwu@gmail.com')
                    expect(response.body).toHaveProperty('password',expect.any(String))
                    expect(response.status).toBe(201)
                    done()
                })
        })
    })
    describe('Succses Register Admin' , () => {
        test('Its should be return new user and status 201', (done) => {
            request(app)
                .post('/register')
                .send({
                    username : "uwu",
                    email : 'admin@gmail.com',
                    password : "123456789"
                })
                .end((err,response) => {
                    expect(err).toBe(null),
                    expect(response.body).toHaveProperty('email','admin@gmail.com')
                    expect(response.body).toHaveProperty('password',expect.any(String))
                    expect(response.status).toBe(201)
                    done()
                })
        })
    })
    describe('Error Register Email', () => {
        test('Its should Be return error and Status 400',(done) => {
            request(app)
                .post('/register')
                .send({
                    username :  "uwu",
                    email : 'uwugmail.com',
                    password : "123456789",
                })
                .end((err,response) => {
                    if(response.name === 'SequelizeValidationError'){
                        expect(response.body).toHaveProperty('message')
                        expect(response.status).toHaveLength(400)
                    }else{
                        expect(response.status).toBe(500)
                    }
                    done()
                })
        })
    })
    describe('Error Register Same Email', () => {
        test('Its should Be return error and Status 400',(done) => {
            request(app)
                .post('/register')
                .send({
                    username : "uwu",
                    email : 'uwu@gmail.com',
                    password : "123456789",
                })
                .end((err,response) => {
                    if(response.name === 'SequelizeValidationError'){
                        expect(response.body).toHaveProperty('message')
                        expect(response.status).toBe(400)
                    }
                    done()
                })
        })
    })
    describe('Error Register Password', () => {
        test('Its should Be return error and Status 400',(done) => {
            request(app)
                .post('/register')
                .send({
                    username : 'uwu',
                    email : 'uwu@gmail.com',
                    password : "12345",
                })
                .end((err,response) => {
                    if(response.name === 'SequelizeValidationError'){
                        expect(response.body).toHaveProperty('message')
                        expect(response.status).toHaveLength(400)
                    }else{
                        expect(response.status).toBe(500)
                    }
                    done()
                })
        })
    })
    describe('Error Register Password Admin', () => {
        test('Its should Be return error and Status 400',(done) => {
            request(app)
                .post('/admin/register')
                .send({
                    username : 'uwu',
                    email : 'admin@gmail.com',
                    password : "12345",
                })
                .end((err,response) => {
                    if(response.name === 'SequelizeValidationError'){
                        expect(response.body).toHaveProperty('message')
                        expect(response.status).toHaveLength(400)
                    }else{
                        expect(response.status).toBe(500)
                    }
                    done()
                })
        })
    })
    describe('Error Register Email Admin', () => {
        test('Its should Be return error and Status 400',(done) => {
            request(app)
                .post('/admin/register')
                .send({
                    username :  "uwu",
                    email : 'admingmail.com',
                    password : "123456789",
                })
                .end((err,response) => {
                    if(response.name === 'SequelizeValidationError'){
                        expect(response.body).toHaveProperty('message')
                        expect(response.status).toHaveLength(400)
                    }else{
                        expect(response.status).toBe(500)
                    }
                    done()
                })
        })
    })
})
describe.skip("Check Email" , () => {
    var token ;
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
                console.log(token,'<<<')
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
    describe('Succes Login', () => {
        test('Its should Be return Data and status 200',(done) => {
            request(app)
                .post('/login')
                .send({
                    username : "uwu",
                    email : 'uwu@gmail.com',
                    password : '12345678'
                })
                .end((err,response) => {
                    console.log(response.body)
                    expect(response.body).toHaveProperty('token',expect.any(String))
                    expect(response.status).toBe(200)
                    done()
                })
        })
        test('Its Errors Because invalid Email / password',(done) => {
            request(app)
                .post('/login')
                .send({
                    email : 'uwu@mail.com',
                    password : '12345678'
                })
                .end((err,response) => {
                    console.log(response.body)
                    expect(response.body).toHaveProperty('msg')
                    expect(response.status).toBe(400)
                    done()
                })
        })
    })
})