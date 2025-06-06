import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { GameModel } from './models/Game.model'
import { Sport } from '@/payload-types'
import { getLocale } from 'next-intl/server'

interface GetGamesOptions {
  timeFrame?: 'past' | 'future'
}

interface ExpandOptions {
  field?: boolean
  registrations?: boolean
}

export async function getGamesWhereUserIsRegistered(
  userId: string,
  options: GetGamesOptions = {},
  { expand }: { expand?: ExpandOptions } = {},
): Promise<GameModel[]> {
  const payload = await getPayload({ config })
  const now = new Date()

  const query = {
    collection: 'games' as const,
    where: {
      registrations: {
        contains: userId,
      },
      ...(options.timeFrame === 'past'
        ? {
            'game.startsAt': {
              less_than: now.toISOString(),
            },
          }
        : options.timeFrame === 'future'
          ? {
              'game.startsAt': {
                greater_than: now.toISOString(),
              },
            }
          : {}),
    },
    depth: expand?.field || expand?.registrations ? 2 : 1,
  }

  const { docs } = await payload.find(query)

  const games = docs.map((game) => GameModel.from(game))

  return games
}

export async function getGames(
  options: {
    city?: string
    sportId?: Sport['id']
    timeFrame?: 'past' | 'future'
  } = {},
  { expand }: { expand?: ExpandOptions } = {},
): Promise<GameModel[]> {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const now = new Date()

  const query = {
    collection: 'games' as const,
    where: {
      ...(options.city
        ? {
            'field.address': {
              contains: options.city,
            },
          }
        : {}),
      ...(options.sportId
        ? {
            'sport.id': {
              equals: options.sportId,
            },
          }
        : {}),
      ...(options.timeFrame === 'past'
        ? {
            startsAt: {
              less_than: now.toISOString(),
            },
          }
        : options.timeFrame === 'future'
          ? {
              startsAt: {
                greater_than: now.toISOString(),
              },
            }
          : {}),
    },
    sort: '-createdAt',
    depth: expand?.field || expand?.registrations ? 2 : 1,
    locale: locale as TypedLocale,
  }

  const { docs } = await payload.find(query)

  return docs.map((game) => GameModel.from(game))
}

export async function getNextGame(
  options: {
    city?: string
    sport?: GameModel['sport']
  } = {},
  { expand }: { expand?: ExpandOptions } = {},
): Promise<GameModel | null> {
  const payload = await getPayload({ config })
  const now = new Date()

  const query = {
    collection: 'games' as const,
    where: {
      ...(options.city
        ? {
            'field.address': {
              contains: options.city,
            },
          }
        : {}),
      ...(options.sport
        ? {
            sport: {
              equals: options.sport,
            },
          }
        : {}),
      startsAt: {
        greater_than: now.toISOString(),
      },
    },
    sort: 'startsAt',
    limit: 1,
    depth: expand?.field || expand?.registrations ? 2 : 1,
  }

  const { docs } = await payload.find(query)

  if (docs.length === 0) {
    return null
  }

  return GameModel.from(docs[0])
}
