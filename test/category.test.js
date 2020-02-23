const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, Category, sequelize } = require('../models')
const {queryInterface} = sequelize
const { JwtHelper, BcryptHelper } = require('../helpers/index')


describe('Category Routes', () => {
  let access_token
  let access_token_user
  let categoryId

  beforeAll(done => {
     let newAdmin = {
        name : 'Admin',
        email : 'admin@mail.com',
        password : 'qwerty',
        RoleId : 1
     }
     User.create(newAdmin)
        .then(user => {
           const payload = {
              id : user.id,
              email : user.email,
              RoleId : user.RoleId
           }
           access_token = JwtHelper.generateToken(payload)
           // console.log(access_token)
           let newUser = {
             name : 'gamer',
             email : 'user@mail.com',
             password : 'qwerty',
             RoleId : 2
          }
          User.create(newUser)
             .then(user => {
                const payload = {
                   id : user.id,
                   email : user.email,
                   RoleId : user.RoleId
                }
                access_token_user = JwtHelper.generateToken(payload)
                done()
             })
             .catch(err => {
                done(err)
             })

         })
        .catch(err => {
           done(err)
        })
  })

  beforeAll(done => {
     let newCategory = {
       name : 'Adventure'    
     }
     Category.create(newCategory, {
       returning: true
     })
       .then(category => {
         id = category.id
         done()
       })
       .catch(err => {
         done(err)
       })
  })

  afterAll(done => {
   queryInterface.bulkDelete('Users', {})
      .then(response => {done()})
      .catch(err => done(err))
  })

  //CREATE
  describe('category create', () => {
    test('success create category', done => {
       request(app)
          .post('/categories')
          .set('access_token', access_token)
          .send({ name : 'Action' })
          .end((err, response) => {
             expect(err).toBe(null)
             expect(response.body).toHaveProperty('data', expect.any(Object))
             expect(response.body).toHaveProperty('msg', expect.any(String))
             expect(response.status).toBe(201)
             done()
          })
    })
  })

  //READ
  describe('get categories', () => {
    //FIND ALL
    test('success get all category', done => {
       request(app)
          .get('/categories')
          .set('access_token', access_token)
          .end((err, response) => {
             expect(err).toBe(null)
             expect(response.body).toHaveProperty('data', expect.any(Array))
             expect(response.body).toHaveProperty('msg', expect.any(String))
             expect(response.status).toBe(200)
             done()
          })
    })
  })

  // FIND ONE
  describe('get one category', () => {
    test('success get one category', done => {
      console.log(id, '========UPDATE==========')
       request(app)
          .get(`/categories/${id}`)
          .set('access_token', access_token)
          .send({ name : 'FPS' })
          .end((err, response) => {
             expect(err).toBe(null)
             expect(response.body).toHaveProperty('msg', expect.any(String))
             expect(response.status).toBe(200)
             done()
          })
    })
  })

  //UPDATE
  describe('update category', () => {
    test('success update category', done => {
      console.log(id, '========UPDATE==========')
       request(app)
        .put(`/categories/${id}`)
        .set('access_token', access_token)
        .send({ name : 'FPS' })
        .end((err, response) => {
           expect(err).toBe(null)
           expect(response.body).toHaveProperty('msg', expect.any(String))
           expect(response.status).toBe(200)
           done()
        })
    })
  })

  //DELETE
  describe('delete category', () => {
    test('success delete category', done => {
      console.log(id, '===================')
      // console.log(access_token)
       request(app)
          .delete(`/categories/${id}`)
          .set('access_token', access_token)
          .end((err, response) => {
             expect(err).toBe(null)
             expect(response.body).toHaveProperty('msg', expect.any(String))
             expect(response.status).toBe(200)
             done()
          })
    })
  })
})
