import { AppDataSource } from '../../data-source'
import { User } from '../../entities/user.entity'
import bcrypt from 'bcryptjs'
import { AppError } from '../../errors'

const userUpdatePasswordService = async (email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  })

  if (bcrypt.compareSync(password, user!.password)) {
    throw new AppError(409, 'Inform a different password.')
  }

  const newPassword = bcrypt.hashSync(password, 10)

  await userRepository.update(user!.id, { password: newPassword })

  return true
}

export default userUpdatePasswordService
