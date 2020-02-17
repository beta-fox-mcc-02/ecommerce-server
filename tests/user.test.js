const request = require('supertest')
const app = require('../index')

describe('User Endpoints', () => {
    it('should create a new user', async done => {
        const res = await request(app)
            .post('/users')
            .send({
                email: 'susantoh41@gmail.com',
                first_name: 'Heri',
                last_name: 'Susanto',
                password: 'Password123'
            })
            .then(res => {
                expect(res.statusCode).toEqual(201)
                expect(res.body).toHaveProperty('token')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    it('should return error because user already exists', done => {
        request(app)
            .post('/users')
            .send({
                email: 'susantoh41@gmail.com',
                first_name: 'Heri',
                last_name: 'Susanto',
                password: 'Password123'
            })
            .then(res => {
                expect(res.statusCode).toEqual(400)
                expect(res.body).toHaveProperty('msg')
                expect(res.body).toHaveProperty('errors')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    
})
