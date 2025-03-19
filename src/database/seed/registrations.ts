import { Payload } from 'payload'
import { Registration } from '@payload-types'

export const seedRegistrations = async (payload: Payload) => {
  // First, get all users and games to reference them
  const users = await payload.find({
    collection: 'users',
    limit: 100,
  })

  const games = await payload.find({
    collection: 'games',
    limit: 100,
  })

  // Create maps for easy lookup
  const userMap = users.docs.reduce(
    (acc, user) => {
      acc[user.email as string] = user.id
      return acc
    },
    {} as Record<string, string>,
  )

  const gameMap = games.docs.reduce(
    (acc, game) => {
      acc[game.name] = game.id
      return acc
    },
    {} as Record<string, string>,
  )

  const registrations = [
    // Morning Soccer Match registrations
    {
      game: gameMap['Morning Soccer Match'],
      user: userMap['user1@example.com'],
    },
    {
      game: gameMap['Morning Soccer Match'],
      user: userMap['user2@example.com'],
    },
    {
      game: gameMap['Morning Soccer Match'],
      user: userMap['user3@example.com'],
    },

    // Evening Soccer League registrations
    {
      game: gameMap['Evening Soccer League'],
      user: userMap['user1@example.com'],
    },
    {
      game: gameMap['Evening Soccer League'],
      user: userMap['user4@example.com'],
    },

    // Tennis Singles Match
    {
      game: gameMap['Tennis Singles Match'],
      user: userMap['user2@example.com'],
    },
    {
      game: gameMap['Tennis Singles Match'],
      user: userMap['user3@example.com'],
    },

    // Morning Padel Session
    {
      game: gameMap['Morning Padel Session'],
      user: userMap['user1@example.com'],
    },
    {
      game: gameMap['Morning Padel Session'],
      user: userMap['user2@example.com'],
    },
    {
      game: gameMap['Morning Padel Session'],
      user: userMap['user3@example.com'],
    },

    // Street Basketball Tournament
    {
      game: gameMap['Street Basketball Tournament'],
      user: userMap['user1@example.com'],
    },
    {
      game: gameMap['Street Basketball Tournament'],
      user: userMap['user2@example.com'],
    },
    {
      game: gameMap['Street Basketball Tournament'],
      user: userMap['user3@example.com'],
    },
    {
      game: gameMap['Street Basketball Tournament'],
      user: userMap['user4@example.com'],
    },
  ] satisfies Omit<Registration, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>[]

  try {
    for (const registration of registrations) {
      await payload.create({
        collection: 'registrations',
        data: registration,
      })
    }
    console.log('✅ Registrations seeded successfully')
  } catch (error) {
    console.error('Error seeding registrations:', error)
  }
}
