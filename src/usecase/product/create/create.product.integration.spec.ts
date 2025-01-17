import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';
describe("Integration test create product use case", () => {
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

    it("should create a new product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository);

        const input = {
            name: "Product 1",
            price: 10
        }

        const output = await usecase.execute(input);

        await expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    })
})