import api from '@/lib/api'
import { Invite } from '@/payload-types'
import useSWRMutation from 'swr/mutation'

export const USE_INVITE_FOR_GAME_QUERY_KEY = 'invite-for-game'

type CreateInviteForGameArgs = {
  id: string
}

const useInviteForGameMutation = () => {
  return useSWRMutation<Invite, Error, string, CreateInviteForGameArgs>(
    USE_INVITE_FOR_GAME_QUERY_KEY,
    (url, { arg }) => api.get<Invite>(`games/${arg.id}/invite`),
  )
}

export default useInviteForGameMutation
