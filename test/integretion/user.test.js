const request = require('supertest');
const app = require("../../index");
const { connect } = require('./database')
const userModel = require('../../models/user.models');

describe("user route", () => {

    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await userModel.create({ email: 'sam@gmail.com', password: '123456'});

        const loginResponse = await request(app)
        .post('/login')
        .send({ 
            email: 'sam@gmail.com', 
            password: '123456'
        });

        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })


    it('should return 200 as status ', async() =>{
       
        await userModel.create({
            email: 'samuel@gmail.com', 
            password: '123456',
            first_name: "monday",
            last_name: "umoh"
        })

        const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200);
    })
} )