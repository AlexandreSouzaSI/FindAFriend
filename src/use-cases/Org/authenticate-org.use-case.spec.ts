import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org.use-case'
import { makeOrg } from '../tests/make-org.factory'
import { InvalidCredentialsError } from '../errors/invalid-credentials.error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-org-repository'

describe('Authenticate Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    const password = '123456'

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    )

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password,
    })

    expect(authenticatedOrg).toEqual(org)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'alemoura@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password = '123456'

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    )

    await expect(() =>
      sut.execute({
        email: org.email,
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
