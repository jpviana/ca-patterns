import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import FindProductUseCase from './find.product.usecase';

describe("Test integration find product use cases", () => {
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

    it("should find a product use case", async () => {
        const usecase = new FindProductUseCase(repository);
        const product = new Product("123","Product 1", 10);
        await repository.create(product);

        const input = {
            id: "123",
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await usecase.execute(input);

        expect(result.id).toBe(product.id);

    })

})