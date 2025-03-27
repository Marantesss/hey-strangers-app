import api from '@/lib/api'
import useSWR from 'swr'
import { SportModel } from '../shared/models/Sport.model'
import { useLocale } from 'next-intl'

export const USE_SPORTS_QUERY_KEY = 'sports'

const useSportsQuery = () => {
  const locale = useLocale()

  return useSWR(USE_SPORTS_QUERY_KEY, async () => {
    const response = await api.find('sports', {
      query: {
        locale,
      },
    })

    return response.docs.map((sport) => SportModel.from(sport))
  })
}

export default useSportsQuery
