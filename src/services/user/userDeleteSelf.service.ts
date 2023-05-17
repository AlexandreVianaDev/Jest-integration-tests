import { AppDataSource } from '../../data-source'
import { User } from '../../entities/user.entity'

const userDeleteSelfService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  })

  await userRepository.delete(user!.id)

  return true
}

export default userDeleteSelfService
