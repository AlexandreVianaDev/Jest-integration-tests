import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import productsMock from "../mocks/products.mock";
import { Product } from "../../entities/product.entity";

describe("POST - /products", () => {
  let connection: DataSource;
  let productRepo: Repository<Product>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        productRepo = res.getRepository(Product);
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const products: Product[] = await productRepo.find();
    await productRepo.remove(products);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Success - Should create an Product", async () => {
    const response = await request(app)
      .post("/products")
      .send(productsMock.createProductDefaultMock);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining(productsMock.createProductDefaultResponseMock)
    );
  });
});
