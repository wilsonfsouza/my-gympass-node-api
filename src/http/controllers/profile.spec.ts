import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '12345678',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'janedoe@example.com',
      password: '12345678',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
      }),
    )
  })
})
