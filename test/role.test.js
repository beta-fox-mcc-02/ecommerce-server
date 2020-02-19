const request = require('supertest')
const app = require('../app')
const { Role } = require('../models')

describe('findAll role', () => {
    test('return array of object', (done) => {
        request(app)
            .get('/roles')
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('data')
                expect(response.body).toHaveProperty('msg')
                expect(response.status).toBe(200)
                done()
            })
    })
})