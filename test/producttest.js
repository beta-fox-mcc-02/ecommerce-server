const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize;
const { sign } = require('../helpers/jwt.js');
let token = '';

describe('Product Routes', () => {
  beforeAll((done) => {
    User.create({
        email : 'hendry@mail.com',
        password : '123456',
        RoleId: 1
    })
    .then(user => {
        token = sign({ id: user.id });
        done()
    })
    .catch(done)
  })

  describe('Product List Test', () => {
    console.log(token);
    
    test('it should return product list object and status 201', (done) => {
      request(app)
        .get('/product')
        .set('token', token)
        .then((response) => {
          console.log(response.body);
          
          expect(response.body).toHaveProperty('name', expect.any(String))
          expect(response.body).toHaveProperty('image_url', expect.any(String))
          expect(response.body).toHaveProperty('price', expect.any(Number))
          expect(response.body).toHaveProperty('stock', expect.any(String))
          expect(response.status).toBe(200)
          done()
        })
        .catch(err => {
            done(err)
        })
    })

  //   // test('it should return err and status 400', (done) => {
  //   //   request(app)
  //   //     .post('/user/register')
  //   //     .send({
  //   //       email: 'd@mail.com',
  //   //       password: '12345',
  //   //       RoleId: 1
  //   //     })
  //   //     .then((response) => {
  //   //       expect(response.statusCode).toEqual(400);
  //   //       expect(response.body).toHaveProperty('msg', 'Validation Error');
  //   //       expect(response.body).toHaveProperty('process', 'User registration');
  //   //       expect(response.status).toBe(400);
  //   //       done();
  //   //     })
  //   //     .catch(err => {
  //   //         done(err)
  //   //     })
  //   // })    
  })
})
