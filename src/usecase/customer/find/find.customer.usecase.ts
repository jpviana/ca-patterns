import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { ImputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {

    private CustomerRepository: CustomerRepositoryInterface;

    constructor(CustomerRepository: CustomerRepositoryInterface) {
        this.CustomerRepository = CustomerRepository;
    }

    async execute(input: ImputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.CustomerRepository.find(input.id);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city
            }
        }
    }
}