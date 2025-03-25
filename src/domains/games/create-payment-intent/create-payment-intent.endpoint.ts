import { addDataAndFileToRequest, Endpoint } from 'payload'
import { getGameById } from '../get-game-by-id/get-game-by-id.service'
import { getRegistrationsByGameId } from '@/domains/registrations/get-registration/get-registration.service'
import stripe from '@/lib/stripe'
import { PaymentIntentParamsSchema, PaymentIntentBodySchema } from './schema'

const BOOKING_FEE = 1

const createPaymentIntentEndpoint: Endpoint = {
  path: '/:id/payment-intent',
  method: 'post',
  handler: async (req) => {
    if (!req.user || req.user.collection !== 'users') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await addDataAndFileToRequest(req)

    const params = PaymentIntentParamsSchema.parse(req.routeParams)
    const body = PaymentIntentBodySchema.parse(req.data)

    const game = await getGameById(params.id)
    const currentGameRegistrations = await getRegistrationsByGameId(game.id)

    const newGameRegistrationCount = currentGameRegistrations.length + body.playerCount

    if (newGameRegistrationCount > game.maxPlayers) {
      return Response.json({ error: 'Game is full' }, { status: 400 })
    }

    try {
      // Create a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: (game.price + BOOKING_FEE) * body.playerCount * 100, // Convert to cents
        currency: 'eur',
        payment_method: body.paymentMethodId,
        customer: req.user.stripeCustomerId ?? undefined,
        metadata: {
          gameId: game.id,
          playerCount: body.playerCount.toString(),
          userId: req.user.id,
        },
      })

      return Response.json({ clientSecret: paymentIntent.client_secret }, { status: 200 })
    } catch (error) {
      console.error('Payment failed:', error)
      return Response.json({ error: 'Payment intent failed' }, { status: 500 })
    }
  },
}

export default createPaymentIntentEndpoint
