const request = require('supertest')
const app = require('../app.js')

describe('API route test', () => {
    test('success login', (done) => {
        request(app)
        .post('/admin/login')
        .send({
            email: `andi@bscomm.com`,
            password: `12345`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('token')
            expect(response.status).toBe(200)
            done()
        })
    })
    test('login admin not found', (done) => {
        request(app)
        .post('/admin/login')
        .send({
            email: `ayam@mail.com`,
            password: `12345`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe(`user not found`)
            expect(response.status).toBe(404)
            done()
        })
    })

    test('login password invalid', (done) => {
        request(app)
        .post('/admin/login')
        .send({
            email: `andi@bscomm.com`,
            password: `1234566`
        })
        .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe(`input invalid`)
            expect(response.status).toBe(400)
            done()
        })
    })
})