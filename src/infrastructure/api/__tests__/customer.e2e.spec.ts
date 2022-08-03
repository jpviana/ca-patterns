import { app, sequelize } from './../express';
import request from 'supertest'

describe("E2e test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    number: 123,
                    zip: "zipcode",
                    city: "City",
                },
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
    })

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
            });

        expect(response.status).toBe(500);
    })
});