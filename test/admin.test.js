const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, Role, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Admin Routes', () => {
  //Register
  describe('Admin Register Test', () => {
    test('it should return new admin object and status 201', (done) => {
      request(app)
        .post('/admin/register')
        .send({
          email: 'hendry@mail.com',
          password: '123456'
        })
        .then((response) => {
          expect(response.statusCode).toEqual(201);
          expect(response.body).toHaveProperty('email', 'hendry@mail.com');
          expect(response.body).toHaveProperty('msg', 'Register Admin Success');
          expect(response.status).toBe(201);
          done();
        })
        .catch(err => {
            done(err)
        })
    })

    test('it should return err and status 400', (done) => {
      request(app)
        .post('/admin/register')
        .send({
          email: 'hendry@mail.com',
          password: '12345'
        })
        .then((response) => {
          expect(response.statusCode).toEqual(400);
          expect(response.body).toHaveProperty('msg', ['Password minimum 6 characters required']);
          expect(response.status).toBe(400);
          done();
        })
        .catch(err => {
            done(err)
        })
    })

    test('it should return err and status 400', (done) => {
      request(app)
        .post('/admin/register')
        .send({
          email: 'hendry@mail.c',
          password: '123456'
        })
        .then((response) => {
          expect(response.statusCode).toEqual(400);
          expect(response.body).toHaveProperty('msg', ['Email format error']);
          expect(response.status).toBe(400);
          done();
        })
        .catch(err => {
            done(err)
        })
    })

    test('it should return err "Please insert your email" and status 400', (done) => {
      request(app)
        .post('/admin/register')
        .send({
          email: '',
          password: '12345'
        })
        .then((response) => {
          expect(response.body).toHaveProperty('msg', ["Please insert your email", "Email format error", "Password minimum 6 characters required"]);
          expect(response.status).toBe(400);
          done();
        })
        .catch(err => {
            done(err)
        })
    })

    test('it should return err "Please insert your password" and status 400', (done) => {
      request(app)
        .post('/admin/register')
        .send({
          email: 'hendry@mail.com',
          password: ''
        })
        .then((response) => {
          expect(response.body).toHaveProperty('msg', ["Please insert your password", "Password minimum 6 characters required"]);
          expect(response.status).toBe(400);
          done();
        })
        .catch(err => {
            done(err)
        })
    })   
  })

  // Login
  describe('Admin Login Test', () => {
    test('it should return token and status 200', (done) => {
      request(app)
      .post('/admin/login')
      .send({
        email: 'hendry@mail.com',
        password: '123456'
      })
      .then((response) => {
          expect(response.body).toHaveProperty('token', expect.any(String));
          expect(response.body).toHaveProperty('msg', 'Login Admin Success');
          expect(response.status).toBe(200);
          done();
        })
        .catch(err => {
            done(err)
        })
    })

    test('it should return err "Invalid username / password" and status 400', (done) => {
      request(app)
        .post('/admin/login')
        .send({
          email: 'hendry@mail.com',
          password: '12345'
        })
        .then((response) => {
          expect(response.body).toHaveProperty('msg', 'Invalid username / password');
          expect(response.status).toBe(400);
          done();
        })
        .catch(err => {
            done(err)
        })
    })

    test('it should return err "Invalid username / password" and status 400', (done) => {
      request(app)
        .post('/admin/login')
        .send({
          email: 'hendry@mailcom',
          pasword: '123456'
        })
        .then((response) => {
          expect(response.body).toHaveProperty('msg', 'Invalid username / password');
          expect(response.status).toBe(400);
          done();
        })
        .catch(err => {
            done(err)
        })
    })

    test('it should return err "Invalid username / password" and status 400', (done) => {
      request(app)
        .post('/admin/login')
        .send({
          email: '',
          pasword: '123456'
        })
        .then((response) => {
          expect(response.body).toHaveProperty('msg', 'Invalid username / password');
          expect(response.status).toBe(400);
          done();
        })
        .catch(err => {
            done(err)
        })
    })

    test('it should return err "Invalid username / password" and status 400', (done) => {
      request(app)
        .post('/admin/login')
        .send({
          email: '',
          pasword: ''
        })
        .then((response) => {
          expect(response.body).toHaveProperty('msg', 'Invalid username / password');
          expect(response.status).toBe(400);
          done();
        })
        .catch(err => {
            done(err)
        })
    })
  })
})

