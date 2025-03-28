import api from '@/lib/api'
import useSWR from 'swr'
import { RegistrationModel } from '../shared/models/Registration.model'

export const USE_REGISTRATIONS_BY_GAME_QUERY_KEY = 'registrationsByGame'

const useRegistrationsByGameQuery = (gameId?: string) =>
  useSWR(
    () => (gameId ? [USE_REGISTRATIONS_BY_GAME_QUERY_KEY, gameId] : null),
    async () => {
      const { docs } = await api.find('registrations', {
        query: {
          where: {
            game: {
              equals: gameId!,
            },
          },
        },
      })

      return docs.map((registration) => RegistrationModel.from(registration))
    },
  )

export default useRegistrationsByGameQuery
