import { IUserLogin } from '../../interfaces/user'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities/user.entity'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppError } from '../../errors'

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  })

  if (!user) {
    throw new AppError(404, 'Account not found')
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError(401, 'Wrong email/password')
  }

  const token = jwt.sign({ email: email }, String(process.env.SECRET_KEY), {
    expiresIn: '1d',
  })

  return token
}

export default userLoginService
