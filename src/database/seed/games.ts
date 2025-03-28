import { Payload } from 'payload'
import { Field, Registration, Sport } from '@payload-types'

export const seedGames = async (payload: Payload) => {
  // Get all fields to reference them
  const fields = await payload.find({
    collection: 'fields',
    limit: 100,
    locale: 'en',
  })
  const fieldMap = fields.docs.reduce(
    (acc, field) => {
      acc[field.name] = field.id
      return acc
    },
    {} as Record<Field['name'], Field['id']>,
  )

  // Get all sports to reference them
  const sports = await payload.find({
    collection: 'sports',
    limit: 100,
    locale: 'en',
  })
  const sportMap = sports.docs.reduce(
    (acc, sport) => {
      acc[sport.name] = sport.id
      return acc
    },
    {} as Record<Sport['name'], Sport['id']>,
  )

  // Get all registrations to reference them
  const registrations = await payload.find({
    collection: 'registrations',
    limit: 100,
    locale: 'en',
  })
  const registrationMap = registrations.docs.reduce(
    (acc, registration) => {
      acc[registration.stripePaymentIntentId] = registration.id
      return acc
    },
    {} as Record<Registration['stripePaymentIntentId'], Registration['id']>,
  )

  const games = [
    // Soccer Games
    {
      pt: {
        name: 'Jogo de Futebol da Manhã',
        description: 'Jogo casual de futebol para todos os níveis',
        startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(), // tomorrow + 9h
        endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(), // tomorrow + 11h
        price: 25.0,
        maxPlayers: 14,
        sport: sportMap['Soccer'],
        field: fieldMap['Parque das Nações Football Field'],
        registrations: [registrationMap['pi_1'], registrationMap['pi_2'], registrationMap['pi_3']],
      },
      en: {
        name: 'Morning Soccer Match',
        description: 'Casual soccer game for all skill levels',
      },
    },
    {
      pt: {
        name: 'Liga de Futebol da Tarde',
        description: 'Jogo de futebol competitivo',
        startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000).toISOString(),
        endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000).toISOString(),
        price: 30.0,
        maxPlayers: 14,
        sport: sportMap['Soccer'],
        field: fieldMap['Parque das Nações Football Field'],
        registrations: [registrationMap['pi_4'], registrationMap['pi_5']],
      },
      en: {
        name: 'Evening Soccer League',
        description: 'Competitive soccer match',
      },
    },
    {
      pt: {
        name: 'Treino de Futebol Indoor',
        description: 'Sessão de treino profissional',
        startsAt: new Date(Date.now() + 48 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(),
        endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000).toISOString(),
        price: 35.0,
        maxPlayers: 12,
        sport: sportMap['Soccer'],
        field: fieldMap['Benfica Indoor Arena'],
        registrations: [registrationMap['pi_6'], registrationMap['pi_7']],
      },
      en: {
        name: 'Indoor Soccer Training',
        description: 'Professional training session',
      },
    },

    // Tennis Games
    {
      pt: {
        name: 'Jogo de Ténis Individual',
        description: 'Jogo amigável de ténis',
        startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(),
        endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(),
        price: 20.0,
        maxPlayers: 2,
        sport: sportMap['Tennis'],
        field: fieldMap['Lisbon Tennis Club'],
        registrations: [registrationMap['pi_8'], registrationMap['pi_9'], registrationMap['pi_10']],
      },
      en: {
        name: 'Tennis Singles Match',
        description: 'Friendly tennis match',
      },
    },
    {
      pt: {
        name: 'Torneio de Ténis em Pares',
        description: 'Torneio amador de pares',
        startsAt: new Date(Date.now() + 72 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
        endsAt: new Date(Date.now() + 72 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000).toISOString(),
        price: 40.0,
        maxPlayers: 8,
        sport: sportMap['Tennis'],
        field: fieldMap['Lisbon Tennis Club'],
        registrations: [
          registrationMap['pi_11'],
          registrationMap['pi_12'],
          registrationMap['pi_13'],
          registrationMap['pi_14'],
        ],
      },
      en: {
        name: 'Tennis Doubles Tournament',
        description: 'Amateur doubles tournament',
      },
    },

    // Padel Games
    {
      pt: {
        name: 'Sessão de Padel da Manhã',
        description: 'Sessão de Padel para iniciantes',
        startsAt: new Date(Date.now() + 48 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
        endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
        price: 15.0,
        maxPlayers: 4,
        sport: sportMap['Padel'],
        field: fieldMap['Padel Belém'],
      },
      en: {
        name: 'Morning Padel Session',
        description: 'Beginner-friendly Padel session',
      },
    },
    // Basketball Games
    {
      pt: {
        name: 'Torneio de Basquetebol de Rua',
        description: 'Torneio de basquetebol 3x3',
        startsAt: new Date(Date.now() + 96 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000).toISOString(),
        endsAt: new Date(Date.now() + 96 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000).toISOString(),
        price: 10.0,
        maxPlayers: 24,
        sport: sportMap['Basketball'],
        field: fieldMap['Sporting Pavilion'],
      },
      en: {
        name: 'Street Basketball Tournament',
        description: '3v3 basketball tournament',
      },
    },
  ]

  try {
    const createdGames = []
    for (const game of games) {
      const createdGame = await payload.create({
        collection: 'games',
        data: game.pt,
        locale: 'pt',
      })

      await payload.update({
        collection: 'games',
        id: createdGame.id,
        data: game.en,
        locale: 'en',
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
