import { Payload } from 'payload'

export const seedSports = async (payload: Payload) => {
  const sports = [
    {
      pt: { name: 'Futebol', emoji: '⚽' },
      en: { name: 'Soccer' },
    },
    {
      pt: { name: 'Padel', emoji: '🎾' },
      en: { name: 'Padel' },
    },
    {
      pt: { name: 'Golfe', emoji: '⛳' },
      en: { name: 'Golf' },
    },
    {
      pt: { name: 'Ténis', emoji: '🎾' },
      en: { name: 'Tennis' },
    },
    {
      pt: { name: 'Basquetebol', emoji: '🏀' },
      en: { name: 'Basketball' },
    },
    {
      pt: { name: 'Voleibol', emoji: '🏐' },
      en: { name: 'Volleyball' },
    },
    {
      pt: { name: 'Polidesportivo', emoji: '⭐' },
      en: { name: 'Multi-purpose' },
    },
  ]

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
