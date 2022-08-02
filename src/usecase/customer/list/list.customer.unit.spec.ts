import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("Joao", new Address('street 1', 123, 'zip 1', 'city 1'));
const customer2 = CustomerFactory.createWithAddress("Joao 2", new Address('street 2', 123, 'zip 2', 'city 2'));

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    }
}


describe("Unit test for listing customer use case", () => {

    it("should list a customer " , async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new ListCustomerUseCase(customerRepository);
        const output = await customerUpdateUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[1].name).toBe(customer2.name);
    })
});