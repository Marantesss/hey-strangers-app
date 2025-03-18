import { getPayload } from 'payload'
import config from '@payload-config'
import { GameModel } from './models/Game.model'

interface GetGamesOptions {
  timeFrame?: 'past' | 'future'
}

interface ExpandOptions {
  field?: boolean
  registrations?: boolean
}

export async function getGameById(
  id: string,
  { expand }: { expand?: ExpandOptions } = {},
): Promise<GameModel | null> {
  const payload = await getPayload({ config })

  const query = {
    collection: 'games' as const,
    id,
    depth: expand?.field || expand?.registrations ? 1 : 0,
  }

  try {
    const game = await payload.findByID(query)
    return GameModel.from(game)
  } catch (error) {
    return null
  }
}

export async function getGamesWhereUserIsRegistered(
  userId: string,
  options: GetGamesOptions = {},
  { expand }: { expand?: ExpandOptions } = {},
): Promise<GameModel[]> {
  const payload = await getPayload({ config })
  const now = new Date()

  const query = {
    collection: 'registrations' as const,
    where: {
      user: {
        equals: userId,
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

  const games = docs.map(({ game }) => {
    if (game instanceof Object) {
      return GameModel.from(game)
    }

    throw new Error('Game not found')
  })

  return games
}

export async function getGames(
  options: {
    city?: string
    sport?: GameModel['sport']
    timeFrame?: 'past' | 'future'
  } = {},
  { expand }: { expand?: ExpandOptions } = {},
): Promise<GameModel[]> {
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
  }

  const { docs } = await payload.find(query)

  return docs.map((game) => GameModel.from(game))
}
