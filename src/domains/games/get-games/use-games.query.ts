'use client'

import api from '@/lib/api'
import useSWR from 'swr'
import { GameModel } from '../shared/models/Game.model'
import { TypedLocale } from 'payload'
import { useLocale } from 'next-intl'

export const USE_GAME_QUERY_KEY = 'games'

type UseGamesQueryProps = {
  options: {
    userId?: string
    cityName?: string
    sportId?: string
    timeFrame?: 'future' | 'past' | 'all'
  }
  expand?: {
    field?: boolean
  }
}

const useGamesQuery = ({ options, expand }: UseGamesQueryProps) => {
  const locale = useLocale()

  return useSWR(
    () => [USE_GAME_QUERY_KEY, options, expand],
    async () => {
      const now = new Date()

      const { docs } = await api.find('games', {
        query: {
          where: {
            ...(options.userId
              ? {
                  'registrations.user': {
                    equals: options.userId,
                  },
                }
              : {}),
            ...(options.cityName
              ? {
                  'field.address': {
                    contains: options.cityName,
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
          depth: expand?.field ? 2 : 1,
          locale: locale as TypedLocale,
        },
      })

      return docs.map((game) => GameModel.from(game))
    },
  )
}

export default useGamesQuery
