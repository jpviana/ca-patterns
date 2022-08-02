import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 10
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test create product uses cases', () => {

    it('should create a product', async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow("Name is required");
    })

    it("should throw an error when price is less than zero", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        input.name = "Product 1";
        input.price = -1;

        await expect(useCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    })
});