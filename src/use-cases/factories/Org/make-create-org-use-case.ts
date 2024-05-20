import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { CreateOrgUseCase } from '@/use-cases/Org/create-org.use-case'

export function makeCreateOrgUseCase() {
  return new CreateOrgUseCase(new PrismaOrgsRepository())
}
