import { Game, User } from '@payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RegistrationModel } from '../shared/models/Registration.model'

interface RegisterForGameArgs {
  gameId: Game['id']
  userId: User['id']
  paymentIntentId: string
  playerCount: number
}

export async function registerForGame({
  gameId,
  userId,
  paymentIntentId,
  playerCount = 1,
}: RegisterForGameArgs) {
  const payload = await getPayload({ config })

  const registrations = await Promise.all(
    Array(playerCount)
      .fill(null)
      .map(() =>
        payload.create({
          collection: 'registrations',
          data: {
            game: gameId,
            user: userId,
            stripePaymentIntentId: paymentIntentId,
          },
        }),
      ),
  )

  return registrations.map((registration) => RegistrationModel.from(registration))
}
