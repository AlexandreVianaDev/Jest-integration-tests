import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import usersMock from "../mocks/users.mock";
import productsMock from "../mocks/products.mock";
import cartMocks from "../mocks/cart.mocks";
import { User } from "../../entities/user.entity";
import generateToken from "../mocks/generateToken";
import { Product } from "../../entities/product.entity";
import { Cart } from "../../entities/cart.entity";

describe("POST - /cart", () => {
  let connection: DataSource;
  let userRepo: Repository<User>;
  let productRepo: Repository<Product>;
  let cartRepo: Repository<Cart>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        userRepo = res.getRepository(User);
        productRepo = res.getRepository(Product);
        cartRepo = res.getRepository(Cart);
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const cart = new Cart();
    cart.subtotal = 0;

    const cartCreate = cartRepo.create(cart);
    await cartRepo.save(cartCreate);

    const name = "name";
    const email = "email@mail.com";
    const password = "123456";

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.cart = cartCreate;

    userRepo.create(user);
    await userRepo.save(user);
  });

  afterAll(async () => {
    const users: User[] = await userRepo.find();
    await userRepo.remove(users);

    const carts: Cart[] = await cartRepo.find();
    await cartRepo.remove(carts);

    await connection.destroy();
  });

  test("Success - Should insert a Product on the Cart", async () => {
    const token = generateToken.genToken(usersMock.createUserDefaultMock.email);

    const productCreated = productRepo.create(
      productsMock.createProductDefaultMock
    );
    await productRepo.save(productCreated);

    const response = await request(app)
      .post("/cart")
      .send(cartMocks.cartAddProductDefaultMock)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining(cartMocks.cartAddProductDefaultResponseMock)
    );
  });
});
