import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-reposotory'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should be able to register a user', async () => {
    const usersReposotory = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersReposotory)

    const { user } = await registerUseCase.execute({
      name: 'Jane Doe',
      email: 'janedoe@eample.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersReposotory = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersReposotory)

    const { user } = await registerUseCase.execute({
      name: 'Jane Doe',
      email: 'janedoe@eample.com',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersReposotory = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersReposotory)

    const email = 'janedoe@eample.com'

    await registerUseCase.execute({
      name: 'Jane Doe',
      email,
      password: '12345678',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Jane Doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
