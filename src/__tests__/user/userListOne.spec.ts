import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import usersMock from "../mocks/users.mock";
import { User } from "../../entities/user.entity";
import generateToken from "../mocks/generateToken";

describe("GET - /users/me", () => {
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

    const userCreated = userRepo.create(usersMock.createUserDefaultMock);
    await userRepo.save(userCreated);
  });

  afterAll(async () => {
    const users: User[] = await userRepo.find();

    await userRepo.remove(users);

    await connection.destroy();
  });

  test("Success - Should list one User", async () => {
    const token = generateToken.genToken(usersMock.createUserDefaultMock.email);

    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining(usersMock.getUsersDefaultMock)
    );
  });
});
