import api from '@/lib/api'
import useSWR from 'swr'
import { useLocale } from 'next-intl'
import { CityModel } from '@/domains/cities/shared/models/City.model'

export const USE_CITIES_QUERY_KEY = 'cities'

const useCitiesQuery = () => {
  const locale = useLocale()

  return useSWR(USE_CITIES_QUERY_KEY, async () => {
    const response = await api.find('cities', {
      query: {
        locale,
      },
    })

    return response.docs.map(CityModel.from)
  })
}

export default useCitiesQuery
