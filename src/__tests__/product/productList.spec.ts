import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import productsMock from "../mocks/products.mock";
import { Product } from "../../entities/product.entity";

describe("GET - /products", () => {
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

  test("Success - Should list all Products", async () => {
    const productCreated = productRepo.create(
      productsMock.createProductDefaultResponseMock
    );
    await productRepo.save(productCreated);

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining(productsMock.createProductDefaultResponseMock),
    ]);
  });
});
