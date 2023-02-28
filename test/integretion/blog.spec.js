const request = require('supertest')
const UserModel = require('../../models/user.models')
const blogModel = require('../../models/blog.Models')
const app = require('../../index');
const { connect } = require('../database')

describe('blog Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await UserModel.create({ email: '7@gmail.com', password: '123456'});

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ email: 'tobi@gmail.com', password: '123456'});

token = loginResponse.body.token;        
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return blogs', async () => {

        await blogModel.create({
            title: "lkwriting test for blog endpoint",
            description : "lkthis is a description on how to write test to an endpoint",
            body: "lki just wish i can use lorem her cause i can not think of a body",
            tags : 'tech',
        })

        await blogModel.create({
            title: "owriting test for blog endpoint",
            description : "pthis is a description on how to write test to an endpoint",
            body: "li just wish i can use lorem her cause i can not think of a body",
            tags : 'tech',
        })

        const response = await request(app)
        .get('/v1/api/blogs')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        // expect(response.body).toHaveProperty("blogdata", [])
        // expect(response.body).toHaveProperty('status', true)

    })

});