import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Planet Fitness',
      description: null,
      phone: null,
      latitude: 40.610699,
      longitude: -122.3385536,
    })

    await gymsRepository.create({
      title: 'Orange Theory',
      description: null,
      phone: null,
      latitude: 42.610699,
      longitude: -125.3385536,
    })

    const { gyms } = await sut.execute({
      query: 'Planet',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Planet Fitness' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Orange Theory ${i}`,
        description: null,
        phone: null,
        latitude: 42.610699,
        longitude: -125.3385536,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Orange',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Orange Theory 21' }),
      expect.objectContaining({ title: 'Orange Theory 22' }),
    ])
  })
})
