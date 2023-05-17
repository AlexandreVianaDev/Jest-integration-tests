import { DataSource, Repository, getRepository } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import * as bcrypt from "bcryptjs";
import usersMock from "../mocks/users.mock";
import { User } from "../../entities/user.entity";

describe("POST - /users", () => {
  let connection: DataSource;
  // let userRepo: Repository<User>;
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        // userRepo = res.getRepository(User);
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const users: User[] = await userRepo.find();

    await userRepo.remove(users);
    // console.log(users)
    // await userRepo.clear();

    // const users: User[] = await userRepo.find();
  });

  afterAll(async () => {
    const users: User[] = await userRepo.find();

    await userRepo.remove(users);

    await connection.destroy();
  });

  test("Success - Should create an User and its Cart", async () => {
    const response = await request(app)
      .post("/users")
      .send(usersMock.createUserDefaultMock);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining(usersMock.createUserDefaultResponseMock)
    );
    expect(
      bcrypt.compareSync(
        usersMock.createUserDefaultMock.password,
        response.body.password
      )
    ).toBeTruthy();
  });

  test("Error - Should not create an User with email already used", async () => {
    // const emailExists = await userRepo.findOneBy({
    //   email: usersMock.createUserBySQLMock.email,
    // });

    // let userCreated: User;

    // if (emailExists) {
    //   userCreated = userRepo.create({
    //     ...usersMock.createUserBySQLMock,
    //     email: crypto.randomUUID() + "@mail.com",
    //   });
    // } else {
    //   userCreated = userRepo.create(usersMock.createUserBySQLMock);
    // }
    // await userRepo.save(userCreated);

    const userCreated = userRepo.create(usersMock.createUserBySQLMock);
    await userRepo.save(userCreated);

    const response = await request(app)
      .post("/users")
      .send(usersMock.createUserBySQLMock);

    expect(response.status).toBe(409);
    expect(response.body).toEqual(
      expect.objectContaining({ message: "Email already exists" })
    );
  });
});
