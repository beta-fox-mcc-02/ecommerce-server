const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

describe('User Routes', () => {
  beforeEach(done => {
    const data = [{
      email: 'mail@mail.com',
      password: '12345',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    sequelize.queryInterface.bulkInsert('Users', data, {})
      .then(res => done())
      .catch(err => done(err))
  })

  afterEach((done) => {
    sequelize.queryInterface.bulkDelete('Users', {})
      .then(res => done())
      .catch(err => done(err))
  })


  describe('User Register', () => {
    describe('Success User Register', () => {
      test('It should return access_token and status 201', (done) => {
        request(app)
          .post('/register')
          .send({
            email: 'uulwake@mail.com',
            password: '12345',
            role: 'admin'
          })
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toHaveProperty('access_token', expect.any(String))
            expect(res.status).toBe(201)
            done()
          })
      })
    })

    describe('Fail User Register', () => {
      describe('Email Error', () => {
        test('Invalid Email', (done) => {
          request(app)
            .post('/register')
            .send({
              email: 'coba@coba',
              password: '12345',
              role: 'admin'
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', expect.any(Array));
              expect(res.body.message).toEqual(expect.arrayContaining(['Invalid Email Address']))
              done();
            })
        })

        test('Null Email', done => {
          request(app)
            .post('/register')
            .send({
              email: null,
              password: '12345',
              role: 'admin'
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', expect.any(Array));
              expect(res.body.message).toEqual(expect.arrayContaining(['Email Cannot Null']))
              done();
            })
        })

        test('Email Already Exists', done => {
          request(app)
            .post('/register')
            .send({
              email: 'mail@mail.com',
              password: 'xxxyyy',
              role: 'admin'
            })
            .end((err, res) => {
              console.log(res);
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message');
              expect(res.body.message).toBe('Email Already Exists');
              done();
            })
        })
      })


      describe('Password Error', () => {
        test('Null Password', done => {
          request(app)
            .post('/register')
            .send({
              email: 'coba@coba.com',
              password: null,
              role: 'admin'
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', expect.any(Array));
              expect(res.body.message).toEqual(expect.arrayContaining(['Password Cannot Null']))
              done();
            })
        })

        test('Less Than Five Length Password', done => {
          request(app)
            .post('/register')
            .send({
              email: 'coba@coba.com',
              password: '1234',
              role: 'admin'
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', expect.any(Array));
              expect(res.body.message).toEqual(expect.arrayContaining(['Password Length Should Be 5-20 Length']))
              done();
            })
        })

        test('More Than Twenty Length Password', done => {
          request(app)
            .post('/register')
            .send({
              email: 'coba@coba.com',
              password: '1234512345123451234512345',
              role: 'admin'
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', expect.any(Array));
              expect(res.body.message).toEqual(expect.arrayContaining(['Password Length Should Be 5-20 Length']))
              done();
            })
        })
      })

      describe('Role Error', () => {
        // Null
        test('Null Role', done => {
          request(app)
            .post('/register')
            .send({
              email: 'coba@coba.com',
              password: '1234567',
              role: null
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', expect.any(Array));
              expect(res.body.message).toEqual(expect.arrayContaining(['Role Cannot Null']))
              done();
            })
        })

        // Is In
        test('Is In [admin, user] Role', done => {
          request(app)
            .post('/register')
            .send({
              email: 'coba@coba.com',
              password: '1234567',
              role: 'adminx'
            })
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', expect.any(Array));
              expect(res.body.message).toEqual(expect.arrayContaining(['Only Accept Admin or Customer']))
              done();
            })
        })
      })

    })
  })

  // user login

  // user google sign in
})