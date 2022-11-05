const request = require('supertest');
const app = require("../../index");


describe("home route page", () => {
    it('should return 200 as statuscode and status', async () => {
        const response = await request(app).get('/')

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: true })
        
    })

    it("should return {not found} if routes does not exist", async () => {
        const response = await request(app).get('/undefined')

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: ' not found' })

    })
})