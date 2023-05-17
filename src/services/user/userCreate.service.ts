import { IUserCreate, IUser } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors";
import { Cart } from "../../entities/cart.entity";

const userCreateService = async ({ name, email, password }: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const emailAlreadyExists = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (emailAlreadyExists) {
    throw new AppError(409, "Email already exists");
  }

  const cart = new Cart();
  cart.subtotal = 0;

  cartRepository.create(cart);
  await cartRepository.save(cart);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.cart = cart;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default userCreateService;
