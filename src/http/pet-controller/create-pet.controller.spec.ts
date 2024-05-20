import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { makeOrg } from '@/use-cases/tests/make-org.factory'
import { makePet } from '@/use-cases/tests/make-pet.factory'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    expect(response.status).toBe(201)
  })
})
