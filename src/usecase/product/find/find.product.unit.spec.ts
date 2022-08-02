import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe('Unit test find product use case', () => {
    
    const repository = MockRepository();

    it('should find product use case', async () => {
        const usecase = new FindProductUseCase(repository);
        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Product 1",
            price: 10
        }
        const result = await usecase.execute(input);

        expect(result).toEqual(output)
    })

    it("should note found a product", async () => {
        repository.find.mockImplementation(()=>{
            throw new Error("Product not found");
        })
        const usecase = new FindProductUseCase(repository);

        const input = { id: "123" }

        expect(()=> {
            return usecase.execute(input)
        }).rejects.toThrow("Product not found")
    });
});