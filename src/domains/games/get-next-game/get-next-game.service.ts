import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache as cache } from 'next/cache'
import { GameModel } from '../shared/models/Game.model'

interface GetNextGameOptions {
  city?: string
  sport?: GameModel['sport']
}

interface ExpandOptions {
  field?: boolean
  registrations?: boolean
}

export const getCachedNextGame = (options: GetNextGameOptions = {}, expand: ExpandOptions = {}) => {
  return getCachedNextGameWithOptions(options, expand)
}

const getCachedNextGameWithOptions = cache(
  async (options: GetNextGameOptions, expand: ExpandOptions): Promise<GameModel | null> => {
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
  },
  ['next_game'],
  {
    tags: ['games', 'next-game'],
    revalidate: 300, // 5 minutos - games podem mudar frequentemente
  },
)
