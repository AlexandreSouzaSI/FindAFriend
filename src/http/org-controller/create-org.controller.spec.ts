import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { makeOrg } from '@/use-cases/tests/make-org.factory'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new org', async () => {
    const response = await request(app.server).post('/orgs').send(makeOrg())

    expect(response.status).toBe(201)
  })
})
