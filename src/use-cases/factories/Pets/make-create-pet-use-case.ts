import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { CreatePetUseCase } from '../../Pets/create-pet.use-case'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(
    new PrismaOrgsRepository(),
    new PrismaPetsRepository(),
  )
}
