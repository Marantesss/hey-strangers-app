import { Endpoint } from 'payload'
import { InviteParamsSchema } from './schema'
import getInviteByGameAndUser from '@/domains/invites/get-invite-by-game-and-user/get-invite-by-game-and-user.service'
import createInviteByGameAndUser from '@/domains/invites/create-invite-for-game-and-user/create-invite-by-game-and-user.service'
import { getGameById } from '../get-game-by-id/get-game-by-id.service'

const inviteForGameEndpoint: Endpoint = {
  path: '/:id/invite',
  method: 'get',
  handler: async ({ user, routeParams }) => {
    if (!user) {
      throw new Error('Unauthorized')
    }

    const { id } = InviteParamsSchema.parse(routeParams)

    const game = await getGameById(id)

    let invite = await getInviteByGameAndUser(game.id, user.id)

    if (!invite) {
      invite = await createInviteByGameAndUser(game.id, user.id)
    }

    return Response.json(invite)
  },
}

export default inviteForGameEndpoint
