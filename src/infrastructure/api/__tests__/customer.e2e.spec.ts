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

    it("should not list all customer", async () => {
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

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "John2",
                address: {
                    street: "Street2",
                    number: 1234,
                    zip: "zipcode2",
                    city: "City2",
                },
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
    })
});