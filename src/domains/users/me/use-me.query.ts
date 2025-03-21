import api from '@/lib/api'
import useSWR from 'swr'

export const USE_ME_QUERY_KEY = 'me'

const useMeQuery = () =>
  useSWR(USE_ME_QUERY_KEY, () => api.me('users'), { revalidateIfStale: false })

export default useMeQuery
