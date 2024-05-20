import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { AuthenticateOrgUseCase } from '@/use-cases/Org/authenticate-org.use-case'

export function makeAuthenticateOrgUseCase() {
  return new AuthenticateOrgUseCase(new PrismaOrgsRepository())
}
