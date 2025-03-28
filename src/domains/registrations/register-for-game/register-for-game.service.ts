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

  const transactionID = await payload.db.beginTransaction()

  if (!transactionID) {
    throw new Error('Failed to start transaction')
  }

  try {
    const registrations = await Promise.all(
      Array(playerCount)
        .fill(null)
        .map((_, index) =>
          payload.create({
            collection: 'registrations',
            data: {
              user: userId,
              stripePaymentIntentId: paymentIntentId,
              isMainRegistration: index === 0,
            },
            req: { transactionID },
          }),
        ),
    )

    const game = await payload.findByID({
      collection: 'games',
      id: gameId,
      req: { transactionID },
    })

    const newRegistrations = [
      ...(game.registrations || []),
      ...registrations.map((registration) => registration.id),
    ]

    await payload.update({
      collection: 'games',
      id: gameId,
      data: { registrations: newRegistrations },
      req: { transactionID },
    })

    await payload.db.commitTransaction(transactionID)

    return registrations.map((registration) => RegistrationModel.from(registration))
  } catch (error) {
    await payload.db.rollbackTransaction(transactionID)
    throw error
  }
}
