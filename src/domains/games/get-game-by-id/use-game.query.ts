import api from '@/lib/api'
import useSWR from 'swr'
import { GameModel } from '../shared/models/Game.model'
import { useLocale } from 'next-intl'

export const USE_GAME_QUERY_KEY = 'game'

type UseGameQueryProps = {
  gameId?: string
  expand?: {
    field?: boolean
  }
}

const useGameQuery = ({ gameId, expand }: UseGameQueryProps) => {
  const locale = useLocale()

  return useSWR(
    () => (gameId ? [USE_GAME_QUERY_KEY, gameId, expand] : null),
    async () => {
      const response = await api.findById('games', gameId!, {
        query: {
          depth: expand?.field ? 3 : 1,
          locale: locale,
        },
      })

      return GameModel.from(response)
    },
  )
}

export default useGameQuery
