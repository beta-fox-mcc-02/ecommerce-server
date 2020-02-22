const request = require('supertest')
const app = require('../app')

describe("Category test", () => {
  describe("findAll test", () => {
    test("It should retrun an array of objects of categories from the db with status 200", done => {
      request(app)
        .get('/categories')
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.status).toBe(200)
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ name: 'Smartphone' })
            ]))
          done()
        })
    })
  })

  describe("findByPk test", () => {
    test("It should retrun an object of category from the db with status 200", done => {
      request(app)
        .get('/categories/1')
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.status).toBe(200)
          expect(response.body).toEqual(
            expect.objectContaining({ name: 'Smartphone' })
          )
          done()
        })
    })
  })
})
