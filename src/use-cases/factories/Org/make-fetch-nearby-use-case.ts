import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { FetchNearbyOrgsUseCase } from '@/use-cases/Org/fetch-nearby-orgs.use-case'

export function makeFetchNearbyUseCase() {
  return new FetchNearbyOrgsUseCase(new PrismaOrgsRepository())
}
