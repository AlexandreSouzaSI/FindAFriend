import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetUseCase } from '../../Pets/get-pet.use-case'

export function makeGetPetUseCase() {
  return new GetPetUseCase(new PrismaPetsRepository())
}
