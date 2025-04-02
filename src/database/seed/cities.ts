import { Payload } from 'payload'
import { City } from '@payload-types'
import { SeedEntry } from './types'

type CitySeed = Omit<City, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>

export const seedCities = async (payload: Payload) => {
  const cities = [
    {
      pt: { name: 'Porto' },
      en: { name: 'Porto' },
    },
    {
      pt: { name: 'Lisboa' },
      en: { name: 'Lisbon' },
    },
  ] satisfies SeedEntry<CitySeed>[]

  try {
    for (const city of cities) {
      const createdCity = await payload.create({
        collection: 'cities',
        data: city.pt,
        locale: 'pt',
      })

      await payload.update({
        collection: 'cities',
        id: createdCity.id,
        data: city.en,
        locale: 'en',
      })
    }
    console.log('✅ Cities seeded successfully')
  } catch (error) {
    console.error('Error seeding cities:', error)
  }
}
