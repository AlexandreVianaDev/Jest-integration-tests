import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import usersMock from "../mocks/users.mock";
import { User } from "../../entities/user.entity";

describe("POST - /users/login", () => {
  let connection: DataSource;
  let userRepo: Repository<User>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        userRepo = res.getRepository(User);
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    const users: User[] = await userRepo.find();
    await userRepo.remove(users);

    await connection.destroy();
  });

  test("Success - Should be able to login", async () => {
    const userCreated = userRepo.create(usersMock.createUserDefaultMock);
    await userRepo.save(userCreated);

    const response = await request(app)
      .post("/users/login")
      .send(usersMock.loginUserDefaultMock);

    const expectResults = {
      status: 200,
      bodyEqual: { token: expect.any(String) },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });
});
