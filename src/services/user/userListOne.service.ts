import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const userListOneService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  return user;
};

export default userListOneService;
