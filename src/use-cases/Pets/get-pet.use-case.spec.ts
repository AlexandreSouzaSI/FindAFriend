import { beforeEach, describe, expect, it } from 'vitest'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { GetPetUseCase } from './get-pet.use-case'
import { makePet } from '../tests/make-pet.factory'

describe('Get Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a new pet', async () => {
    const pet = await petsRepository.create(makePet())
    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
