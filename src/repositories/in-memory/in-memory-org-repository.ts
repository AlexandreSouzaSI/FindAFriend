import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { Org, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import crypto from 'node:crypto'
import { FindManyNearbyParams, OrgsRepository } from '../org-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id) || null

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email) || null

    return org
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }
}
