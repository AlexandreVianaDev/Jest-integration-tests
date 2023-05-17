import { DataSource } from 'typeorm'
import { AppDataSource } from '../../data-source'
import userCreateService from '../../services/user/userCreate.service'
import request from 'supertest'
import app from '../../app'

import * as bcrypt from 'bcryptjs'

describe(' POST - /users/ ', () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test(' Should create an User and its Cart ', async () => {
    const name = 'name'
    const email = 'email@mail.com'
    const password = '123456'

    const userData = { name, email, password }

    const response = await request(app).post('/users').send(userData)

    expect(response.status).toBe(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'name',
        email: 'email@mail.com',
        cart: {
          id: 1,
          subtotal: 0,
        },
      })
    )
    expect(bcrypt.compareSync(password, response.body.password)).toBeTruthy()
  })
})
