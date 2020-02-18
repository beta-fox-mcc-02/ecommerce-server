const request = require('supertest')
const app = require('../app.js')

describe('Category endpoint test', () => {
  test('success fetch all category', (done) => {
    request(app)
    .get('/category/findall')
    .end((err, response) => {
      expect(err).toBe(null)
      expect(response.body).toHaveProperty('data')
      expect(response.status).toBe(200)
      done()
    })
  })
})