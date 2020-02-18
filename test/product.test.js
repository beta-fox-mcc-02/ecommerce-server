const request = require('supertest')
const app = require('../app')
const { Product, sequelize, User } = require('../models')
const { queryInterface } = sequelize
const jwt = require('../helpers/jwt')
let access_token, user_token 

describe('Product Routes', ()=>{
  beforeAll((done)=>{
    const user = [
      {
        email:'fakhran@mail.com',
        password: '123456',
        role : 'admin' 
      },
      {
        email:'fitri@mail.com',
        password: '123456',
        role : 'user' 
      }
    ]

    User.bulkCreate(user)
      .then(result=>{
        const payload1 = { id : result[0].id }
        const payload2 = { id : result[1].id }
        access_token = jwt.generateToken(payload1)  
        user_token = jwt.generateToken(payload2)  
        console.log(access_token, ' dari before all')
        done()
      })
      .catch(err=>{
        done(err)
      })
  })

  afterEach((done)=>{
    queryInterface.bulkDelete('Products', {})
      .then(result=>{
        done()
      }).catch(err=>{ 
        done(err)
      })
  })

  afterAll((done)=>{
    queryInterface.bulkDelete('Users', {})
    .then(result=>{
      done()
    }).catch(err=>{ 
      done(err)
    })
  })

  describe('Test in create', ()=>{
    describe('product create case success', ()=>{
      test('it should return data new product with success message and status 201', (done)=>{
        request(app)
          .post('/products')
          .set('token',access_token)
          .send({
            name : 'baju bagus',
            image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
            price : 25000,
            stock : 1,
            UserId : 1
          })
          .end((err, response)=>{
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('data', expect.any(Object))
            expect(response.body).toHaveProperty('msg', 'success insert new product')
            expect(response.status).toBe(201)
            done()
          })
      })
    })

    describe('product create case fail', ()=>{
      describe('fail in name', ()=>{
        test('it should return msg Bad request with errors name empty and status 400', (done)=>{
          request(app)
            .post('/products')
            .set('token',access_token)
            .send({
              name : '',
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : 25000,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', ["name cannot be empty"])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('it should return msg Bad request with errors name null and status 400', (done)=>{
          request(app)
            .post('/products')
            .set('token',access_token)
            .send({
              name : null,
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : 25000,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', ["name cannot be null"])
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('fail in image_url', ()=>{
        test('errors invalid image url with status 400', (done)=>{
          request(app)
            .post('/products')
            .set('token',access_token)
            .send({
              name : 'sepatu bekas',
              image_url : 'https://encrypted-tbn0',
              price : 25000,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', ["invalid url"])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('error image url null and status 400', (done)=>{
          request(app)
            .post('/products')
            .set('token',access_token)
            .send({
              name : "sepatu",
              image_url : null,
              price : 25000,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', ["image url cannot be null"])
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('fail in price', ()=>{
        test('error invalid price with status 400', (done)=>{
          request(app)
            .post('/products')
            .set('token',access_token)
            .send({
              name : 'sepatu bekas',
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : -50,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', ["price cannot be negative"])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('error price null and status 400', (done)=>{
          request(app)
            .post('/products')
            .set('token',access_token)
            .send({
              name : "sepatu",
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : null,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', ["price cannot be null"])
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('fail in stock', ()=>{
        test('error invalid stock with status 400', (done)=>{
          request(app)
            .post('/products')
            .set('token',access_token)
            .send({
              name : 'sepatu bekas',
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : 250000,
              stock : -1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', ["stock cannot be negative"])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('error stock null and status 400', (done)=>{
          request(app)
            .post('/products')
            .set('token',access_token)
            .send({
              name : "sepatu",
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : 250000,
              stock : null,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', ["stock cannot be null"])
              expect(response.status).toBe(400)
              done()
            })
        })
      })

    })
  })

  describe('test in update', ()=>{
    let id
    beforeEach((done)=>{
      Product.create({
        name : 'baju bagus',
        image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
        price : 25000,
        stock : 1,
        UserId : 1
      })
        .then(result=>{
          id = result.id
          done()
        })
        .catch(err=>{
          done(err)
        })
    })   
    describe('product update case success', ()=>{
      test('it should update', (done)=>{
        request(app)
          .put(`/products/${id}`)
          .set('token',access_token)
          .send({
            name : 'baju bagus',
            image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
            price : 23000,
            stock : 1,
            UserId : 1
          })
          .end((err, response)=>{
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('data', expect.any(Object))
            expect(response.body).toHaveProperty('status', [1])
            expect(response.body).toHaveProperty('msg', 'success update product')
            expect(response.status).toBe(201)
            done()
          })
      })

      describe('Failed update', ()=>{
        test('wrong product id', (done)=>{
          request(app)
            .put(`/products/${id+1}`)
            .set('token',access_token)
            .send({
              name : 'baju bagus',
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : 23000,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('data', expect.any(Object))
              expect(response.body).toHaveProperty('status', [0])
              expect(response.body).toHaveProperty('msg', 'failed update product')
              expect(response.status).toBe(201)
              done()
            })
        })

        test('not authorized', (done)=>{
          request(app)
            .put(`/products/${id}`)
            .set('token',user_token)
            .send({
              name : 'baju bagus',
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : 23000,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('error', "You are not authorized")
              expect(response.status).toBe(401)
              done()
            })
        })
      })

      

    })
  })

  describe('test in delete', ()=>{
    let id
    beforeEach((done)=>{
      Product.create({
        name : 'baju keren',
        image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
        price : 25000,
        stock : 1,
        UserId : 1
      })
        .then(result=>{
          id = result.id
          done()
        })
        .catch(err=>{
          done(err)
        })
    })   
    describe('product delete case success', ()=>{
      test('it should delete', (done)=>{
        request(app)
          .delete(`/products/${id}`)
          .set('token',access_token)
          .send({
            name : 'baju bagus',
            image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
            price : 23000,
            stock : 1,
            UserId : 1
          })
          .end((err, response)=>{
            expect(err).toBe(null)
            console.log(response.body);
            expect(response.body).toHaveProperty('status', 1)
            expect(response.body).toHaveProperty('msg', 'success delete product')
            expect(response.status).toBe(200)
            done()
          })
      })

      describe('Failed delete', ()=>{
        test('wrong product id', (done)=>{
          request(app)
            .delete(`/products/${id+1}`)
            .set('token',access_token)
            .send({
              name : 'baju bagus',
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : 23000,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('status', 0)
              expect(response.body).toHaveProperty('msg', 'failed to delete product')
              expect(response.status).toBe(200)
              done()
            })
        })

        test('not authorized', (done)=>{
          request(app)
            .delete(`/products/${id}`)
            .set('token',user_token)
            .send({
              name : 'baju bagus',
              image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
              price : 23000,
              stock : 1,
              UserId : 1
            })
            .end((err, response)=>{
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('error', "You are not authorized")
              expect(response.status).toBe(401)
              done()
            })
        })
      }) 
    })
  })

  describe('Test in find All', ()=>{
    beforeEach((done)=>{
      Product.create({
        name : 'baju keren',
        image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
        price : 25000,
        stock : 1,
        UserId : 1
      })
        .then(result=>{
          done()
        })
        .catch(err=>{
          done(err)
        })
    })  

    describe('success find all', ()=>{
      test('it should success find all', (done)=>{
        request(app)
          .get(`/products`)
          .set('token',access_token)
          .end((err, response)=>{
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('products', expect.any(Array))
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('fail find all', ()=>{
      test('not login/ invalid token', (done)=>{
        request(app)
          .get(`/products`)
          .set('token',"access_token")
          .end((err, response)=>{
            expect(err).toBe(null)
            console.log(response.body)
            expect(response.body).toHaveProperty('msg', 'Forbidden')
            expect(response.body).toHaveProperty('error', 'You must login first')
            expect(response.status).toBe(403)
            done()
          })
      })
    })
  })

  describe('Test in find One', ()=>{
    let id
    beforeEach((done)=>{
      Product.create({
        name : 'baju keren',
        image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKQSHZrPQAuh_ruV9w8NOt87RVafyc-mb0Wg4oaa4JyuEZVSwT',
        price : 25000,
        stock : 1,
        UserId : 1
      })
        .then(result=>{
          id = result.id
          done()
        })
        .catch(err=>{
          done(err)
        })
    })  

    describe('success find all', ()=>{
      test('it should success find all', (done)=>{
        request(app)
          .get(`/products/${id}`)
          .set('token',access_token)
          .end((err, response)=>{
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('product', expect.any(Object))
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('fail find all', ()=>{
      test('not login/ invalid token', (done)=>{
        request(app)
          .get(`/products/${id}`)
          .set('token',"access_token")
          .end((err, response)=>{
            expect(err).toBe(null)
            console.log(response.body)
            expect(response.body).toHaveProperty('msg', 'Forbidden')
            expect(response.body).toHaveProperty('error', 'You must login first')
            expect(response.status).toBe(403)
            done()
          })
      })
    })
  })
})