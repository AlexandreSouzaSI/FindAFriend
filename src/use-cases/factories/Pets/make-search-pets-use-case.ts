import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetsUseCase } from '../../Pets/search-pets.use-case'

export function makeSearchPetsUseCase() {
  return new SearchPetsUseCase(new PrismaPetsRepository())
}
