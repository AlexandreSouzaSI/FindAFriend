import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org.use-case'
import { makeOrg } from '../tests/make-org.factory'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-org-repository'

describe('Create Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: CreateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute(makeOrg())

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org with an already used email', async () => {
    const org = makeOrg()

    await orgsRepository.create(org)

    await expect(sut.execute(org)).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash password upon creation', async () => {
    const password = '123456'
    const { org } = await sut.execute(makeOrg({ password }))

    expect(await compare(password, org.password)).toBe(true)
    expect(await compare(password, orgsRepository.items[0].password)).toBe(true)
  })
})
