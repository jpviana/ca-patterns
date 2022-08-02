import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';
describe("Test integration update product use cases", () => {

    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    const repository = new ProductRepository();

    it('should update a product use case', async () => {
        const useCase = new UpdateProductUseCase(repository);
        
        const product = new Product("123", "Product 1", 10);
        await repository.create(product);

        const input = {
            id: product.id,
            name: "Product update",
            price: 15
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(input)

    })
})