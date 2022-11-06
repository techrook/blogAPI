const request = require('supertest');
const { connect } = require('./database');
const blogModel = require("../../models/blog.Models");
const userModel = require('../../models/user.models');
const app = require("../../index");

describe('Test blog endpoint',  () => {

    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await userModel.create({ email: 'messi@example.com', password: '123456'});

        const loginResponse = await request(app)
        .post('/login')
        .send({ 
            email: 'messi@example.com', 
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

    it("Should return blogs", async () => {

        await blogModel.create({
            "blogInfo" : {
                "title": " cristiano ronaldo is the greatest of all time ",
                "description": "blog description",
                "body": "blog body",
                "tags": "sport"
            }
        })

        const response = await request(app)
        .get('/blogs')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200);
    })
})