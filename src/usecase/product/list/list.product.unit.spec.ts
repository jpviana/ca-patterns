import Product from "../../../domain/product/entity/product"
import ListProductUseCase from "./list.product.usecase"

const product1 = new Product("123","Product 1", 10)
const product2 = new Product("1234","Product 2", 15)

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
    }
}

describe("Unit test list product use cases", () => {
    const repository = MockRepository();

    it("should list all products", async () => {
        const useCase = new ListProductUseCase(repository);
        const output = await useCase.execute({})

        expect(output.products.length).toEqual(2);
        expect(output.products[0].name).toEqual("Product 1");
        expect(output.products[1].name).toEqual("Product 2");
    });
})