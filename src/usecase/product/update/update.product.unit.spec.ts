import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test update product use cases', () => {
    const repository = MockRepository();

    it('should update a product use case', async () => {
        
        const useCase = new UpdateProductUseCase(repository);

        const input = {
            id: product.id,
            name: "Product update",
            price: 20
        }

        const output = await useCase.execute(input);

        expect(output).toEqual(input)
    })
})