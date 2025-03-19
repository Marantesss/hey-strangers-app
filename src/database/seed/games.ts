import { Payload } from 'payload'
import { Game } from '@payload-types'

export const seedGames = async (payload: Payload) => {
  // First, get all fields to reference them
  const fields = await payload.find({
    collection: 'fields',
    limit: 100,
  })

  const fieldMap = fields.docs.reduce(
    (acc, field) => {
      acc[field.name] = field.id
      return acc
    },
    {} as Record<string, string>,
  )

  const games = [
    // Soccer Games
    {
      name: 'Morning Soccer Match',
      description: 'Casual soccer game for all skill levels',
      startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(), // tomorrow + 9h
      endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(), // tomorrow + 11h
      price: 25.0,
      maxPlayers: 14,
      sport: 'soccer',
      field: fieldMap['Campo de Futebol Parque das Nações'],
    },
    {
      name: 'Evening Soccer League',
      description: 'Competitive soccer match',
      startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000).toISOString(),
      endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000).toISOString(),
      price: 30.0,
      maxPlayers: 14,
      sport: 'soccer',
      field: fieldMap['Campo de Futebol Parque das Nações'],
    },
    {
      name: 'Indoor Soccer Training',
      description: 'Professional training session',
      startsAt: new Date(Date.now() + 48 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(),
      endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000).toISOString(),
      price: 35.0,
      maxPlayers: 12,
      sport: 'soccer',
      field: fieldMap['Arena Indoor Benfica'],
    },

    // Tennis Games
    {
      name: 'Tennis Singles Match',
      description: 'Friendly tennis match',
      startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(),
      endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(),
      price: 20.0,
      maxPlayers: 2,
      sport: 'tennis',
      field: fieldMap['Clube de Ténis de Lisboa'],
    },
    {
      name: 'Tennis Doubles Tournament',
      description: 'Amateur doubles tournament',
      startsAt: new Date(Date.now() + 72 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
      endsAt: new Date(Date.now() + 72 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000).toISOString(),
      price: 40.0,
      maxPlayers: 8,
      sport: 'tennis',
      field: fieldMap['Clube de Ténis de Lisboa'],
    },

    // Padel Games
    {
      name: 'Morning Padel Session',
      description: 'Beginner-friendly Padel session',
      startsAt: new Date(Date.now() + 48 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
      endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
      price: 15.0,
      maxPlayers: 4,
      sport: 'padel',
      field: fieldMap['Padel Belém'],
    },
    // Basketball Games
    {
      name: 'Street Basketball Tournament',
      description: '3v3 basketball tournament',
      startsAt: new Date(Date.now() + 96 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000).toISOString(),
      endsAt: new Date(Date.now() + 96 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000).toISOString(),
      price: 10.0,
      maxPlayers: 24,
      sport: 'basketball',
      field: fieldMap['Pavilhão do Sporting'],
    },
  ] satisfies Omit<Game, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>[]

  try {
    const createdGames = []
    for (const game of games) {
      const createdGame = await payload.create({
        collection: 'games',
        data: game,
      })
      createdGames.push(createdGame)
    }
    console.log('✅ Games seeded successfully')
    return createdGames
  } catch (error) {
    console.error('Error seeding games:', error)
    return []
  }
}
