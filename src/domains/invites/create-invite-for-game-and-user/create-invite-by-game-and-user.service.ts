import { getPayload } from 'payload'
import config from '@payload-config'
import { Invite } from '@payload-types'

const createInviteByGameAndUser = async (gameId: string, userId: string): Promise<Invite> => {
  const payload = await getPayload({ config })

  const invite = await payload.create({
    collection: 'invites',
    data: {
      game: gameId,
      user: userId,
    },
  })

  return invite
}

export default createInviteByGameAndUser
