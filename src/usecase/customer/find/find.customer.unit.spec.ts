import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

const customer = new Customer("123", "Joao");
const address = new Address("street", 123, "zip", "city")
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find customer use case", () => {
    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = { id: "123" }

        const output = {
            id: "123",
            name: "Joao",
            address: {
                street: "street",
                number: 123,
                zip: "zip",
                city: "city"
            }
        }
        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should note found a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(()=>{
            throw new Error("Customer not found");
        })
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = { id: "123" }

        expect(()=> {
            return usecase.execute(input)
        }).rejects.toThrow("Customer not found")
    });
})