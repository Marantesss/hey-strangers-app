import { Payload } from 'payload'
import { Sport } from '@payload-types'
import { SeedEntry } from './types'

type SportSeed = Omit<Sport, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>

export const seedSports = async (payload: Payload) => {
  const sports = [
    {
      pt: { name: 'Futebol', emoji: '⚽' },
      en: { name: 'Soccer', emoji: '⚽' },
    },
    {
      pt: { name: 'Padel', emoji: '🎾' },
      en: { name: 'Padel', emoji: '🎾' },
    },
    {
      pt: { name: 'Golfe', emoji: '⛳' },
      en: { name: 'Golf', emoji: '⛳' },
    },
    {
      pt: { name: 'Ténis', emoji: '🎾' },
      en: { name: 'Tennis', emoji: '🎾' },
    },
    {
      pt: { name: 'Basquetebol', emoji: '🏀' },
      en: { name: 'Basketball', emoji: '🏀' },
    },
    {
      pt: { name: 'Voleibol', emoji: '🏐' },
      en: { name: 'Volleyball', emoji: '🏐' },
    },
    {
      pt: { name: 'Polidesportivo', emoji: '⭐' },
      en: { name: 'Multi-purpose', emoji: '⭐' },
    },
  ] satisfies SeedEntry<SportSeed>[]

  try {
    for (const sport of sports) {
      const createdSport = await payload.create({
        collection: 'sports',
        data: sport.pt,
        locale: 'pt',
      })

      await payload.update({
        collection: 'sports',
        id: createdSport.id,
        data: sport.en,
        locale: 'en',
      })
    }
    console.log('✅ Sports seeded successfully')
  } catch (error) {
    console.error('Error seeding sports:', error)
  }
}
