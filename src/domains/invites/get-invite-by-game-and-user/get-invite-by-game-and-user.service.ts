import { getPayload } from 'payload'
import config from '@payload-config'
import { Invite } from '@payload-types'

const getInviteByGameAndUser = async (gameId: string, userId: string): Promise<Invite | null> => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'invites',
    where: {
      game: { equals: gameId },
      user: { equals: userId },
    },
  })

  return docs[0]
}

export default getInviteByGameAndUser
