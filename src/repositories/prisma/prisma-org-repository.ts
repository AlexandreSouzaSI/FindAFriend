import { prisma } from '@/lib/prisma'
import { Org, Prisma } from '@prisma/client'
import { FindManyNearbyParams, OrgsRepository } from '../org-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `

    return gyms
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({ where: { id } })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }
}
