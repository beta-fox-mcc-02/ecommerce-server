const request = require('supertest')
const app = require('../index')

const testImage = `${__dirname}/image.jpg`

let token

beforeAll(done => {
  request(app)
    .post('/users/register')
    .send({
      email: 'susan@gmail.com',
      first_name: 'Heri',
      last_name: 'Susan',
      password: 'Password123'
    })
    .then(res => {
      token = res.body.token
      done()
    })
    .catch(done)
})

describe('Product Endpoints', () => {
  it('should create a new product with image', done => {
    request(app)
      .post(`/products`)
      .set('Authorization', `Bearer ${token}`)
      .attach('image', testImage, { contentType: 'application/octet-stream' })
      .field('name', 'Surface Studio')
      .field('price', 50000000)
      .field('stock', 200)
      .then(res => {
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('product')
        done()
      })
      .catch(done)
  })

  it('should fetch a single product', done => {
    const productId = 1
    request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('product')
        done()
      })
      .catch(done)
  })

  it('should fetch all products', done => {
    request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('products')
        expect(res.body.products).toHaveLength(1)
        done()
      })
      .catch(done)
  })

  it('should update product image', done => {
    const productId = 1
    request(app)
      .patch(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .attach('image', testImage, { contentType: 'application/octet-stream' })
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('product')
        expect(res.body.product).toHaveProperty(
          'name',
          'image_url',
          'price',
          'stock'
        )
        done()
      })
      .catch(done)
  })

  it('should update a product without image', done => {
    const productId = 1
    request(app)
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Surface Studio 2',
        price: 35000000,
        stock: 19
      })
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('product')
        expect(res.body.product).toHaveProperty(
          'name',
          'image_url',
          'price',
          'stock'
        )
        done()
      })
      .catch(done)
  })

  it('should return status code 400 if db constraint is violated', done => {
    request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Surface Studio 2'
      })
      .then(res => {
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('errors')
        done()
      })
      .catch(done)
  })

  it('should delete a product', done => {
    const productId = 1
    request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.statusCode).toEqual(204)
        done()
      })
      .catch(done)
  })

  it('should respond with status code 404 if resource is not found', done => {
    const productId = 2
    request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.statusCode).toEqual(404)
        done()
      })
      .catch(done)
  })
})
