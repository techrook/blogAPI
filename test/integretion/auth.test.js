const request = require('supertest');
const { connect } = require('./database');
const userModel = require('../../models/user.models');
const app = require("../../index");

describe('Authentication',  () => {

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
            email:"gilll@gmail.com",
            password: "123456"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('email', "gilll@gmail.com")
        expect(response.body.user).not.toBe('password', "123456") // password gets hashed
    })

    it("should login users",  async () => {

        const user = await userModel.create({ email:"laull@gmail.com", password: '123456'});


        const response = await request(app).post('/login').send({
            email:"laull@gmail.com",
            password: "123456"
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
    })

})
