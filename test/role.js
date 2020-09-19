const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, Role, sequelize } = require('../models')
const {queryInterface} = sequelize
const { JwtHelper, BcryptHelper } = require('../helpers/index')


// describe('Role Routes', () => {
  let access_token
  let access_token_user
  let roleId

  // beforeAll(done => {
  //    let newAdmin = {
  //       name : 'Admin',
  //       email : 'admin@mail.com',
  //       password : 'qwerty',
  //       RoleId : 1
  //    }
  //    User.create(newAdmin)
  //       .then(user => {
  //          const payload = {
  //             id : user.id,
  //             email : user.email,
  //             RoleId : user.RoleId
  //          }
  //          access_token = JwtHelper.generateToken(payload)
  //          // console.log(access_token)
  //          let newUser = {
  //            name : 'gamer',
  //            email : 'user@mail.com',
  //            password : 'qwerty',
  //            RoleId : 2
  //         }
  //         User.create(newUser)
  //            .then(user => {
  //               const payload = {
  //                  id : user.id,
  //                  email : user.email,
  //                  RoleId : user.RoleId
  //               }
  //               access_token_user = JwtHelper.generateToken(payload)
  //               done()
  //            })
  //            .catch(err => {
  //               done(err)
  //            })

  //        })
  //       .catch(err => {
  //          done(err)
  //       })
  // })

  // beforeAll(done => {
  //    let newRole = {
  //      name : 'Admin'    
  //    }
  //    Role.create(newRole, {
  //      returning: true
  //    })
  //      .then(role => {
  //        id = role.id
  //        done()
  //      })
  //      .catch(err => {
  //        done(err)
  //      })
  // })

  // afterAll(done => {
  //  queryInterface.bulkDelete('Users', {})
  //     .then(response => {done()})
  //     .catch(err => done(err))
  // })

  //CREATE
  // describe('role create', () => {
  //   test('success create role', done => {
  //      request(app)
  //         .post('/roles')
  //         .set('access_token', access_token)
  //         .send({ name : 'Action' })
  //         .end((err, response) => {
  //            expect(err).toBe(null)
  //            expect(response.body).toHaveProperty('data', expect.any(Object))
  //            expect(response.body).toHaveProperty('msg', expect.any(String))
  //            expect(response.status).toBe(201)
  //            done()
  //         })
  //   })
  // })

  //READ
  // describe('get roles', () => {
  //   //FIND ALL
  //   test('success get all role', done => {
  //      request(app)
  //         .get('/roles')
  //         .set('access_token', access_token)
  //         .end((err, response) => {
  //            expect(err).toBe(null)
  //            expect(response.body).toHaveProperty('data', expect.any(Array))
  //            expect(response.body).toHaveProperty('msg', expect.any(String))
  //            expect(response.status).toBe(200)
  //            done()
  //         })
  //   })
  // })

  // FIND ONE
  // describe('get one role', () => {
  //   test('success get one role', done => {
  //     console.log(id, '========UPDATE==========')
  //      request(app)
  //         .get(`/roles/${id}`)
  //         .set('access_token', access_token)
  //         .send({ name : 'Admin' })
  //         .end((err, response) => {
  //            expect(err).toBe(null)
  //            expect(response.body).toHaveProperty('msg', expect.any(String))
  //            expect(response.status).toBe(200)
  //            done()
  //         })
  //   })
  // })

  //UPDATE
  // describe('update role', () => {
  //   test('success update role', done => {
  //     console.log(id, '========UPDATE==========')
  //      request(app)
  //       .put(`/roles/${id}`)
  //       .set('access_token', access_token)
  //       .send({ name : 'Admin' })
  //       .end((err, response) => {
  //          expect(err).toBe(null)
  //          expect(response.body).toHaveProperty('msg', expect.any(String))
  //          expect(response.status).toBe(200)
  //          done()
  //       })
  //   })
  // })

  //DELETE
  // describe('delete role', () => {
  //   test('success delete role', done => {
  //     console.log(id, '===================')
  //     // console.log(access_token)
  //      request(app)
  //         .delete(`/roles/${id}`)
  //         .set('access_token', access_token)
  //         .end((err, response) => {
  //            expect(err).toBe(null)
  //            expect(response.body).toHaveProperty('msg', expect.any(String))
  //            expect(response.status).toBe(200)
  //            done()
  //         })
  //   })
  // })
// })
