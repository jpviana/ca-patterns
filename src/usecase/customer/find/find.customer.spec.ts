import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
describe("Test find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Joao");
        const address = new Address("rua 1",123,"380000", "patos de minas")
        customer.changeAddress(address);
        await customerRepository.create(customer)

        const input = {id:"123"}

        const output = {id:"123",name:"Joao",address:{
            street:"rua 1",
            
        }}

        const result = new FindCustomerUseCase(customerRepository).excute(input);
    });
})