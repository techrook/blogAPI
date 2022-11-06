const request = require('supertest');
const { connect } = require('./database');
const userModel = require('../../models/user.models');
const app = require("../../index");


describe('Authentication',  () => {
    jest.useFakeTimers()
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })


    it("should signup users", async() => {
        const response = await request(app).post('/signup').send({
            email:"23@gmail.com",
            password: "123456"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('email', "monday23@gmail.com")
        expect(response.body.user).not.toBe('password', "123456")
    })

    it("should login users",  async () => {

        const user = await userModel.create({ email:"23@gmail.com", password: '123456'});


        const response = await request(app).post('/login').send({
            email:"23@gmail.com",
            password: "123456"
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
    })

})
