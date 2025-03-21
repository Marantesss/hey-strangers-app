import api from '@/lib/api'
import useSWR from 'swr'
import { GameModel } from '../shared/models/Game.model'

export const USE_GAME_QUERY_KEY = 'game'

const useGameQuery = (gameId?: string) =>
  useSWR(
    () => (gameId ? [USE_GAME_QUERY_KEY, gameId] : null),
    async () => {
      const response = await api.findById('games', gameId!)

      return GameModel.from(response)
    },
  )

export default useGameQuery
