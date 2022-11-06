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

        await userModel.create({ email: 'person1', password: '123456'});

        const loginResponse = await request(app)
        .post('/login')
        .send({ 
            email: 'person1', 
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
                "title": "i don change am again ",
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