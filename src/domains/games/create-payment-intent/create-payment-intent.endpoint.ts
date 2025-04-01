import { addDataAndFileToRequest, Endpoint } from 'payload'
import { getGameById } from '../get-game-by-id/get-game-by-id.service'
import { getRegistrationsByGameId } from '@/domains/registrations/get-registrations-by-game/get-registrations-by-game-id.service'
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

    try {
      const params = PaymentIntentParamsSchema.parse(req.routeParams)
      const body = PaymentIntentBodySchema.parse(req.data)

      const shouldCreateNewCard = !!body.newPaymentMethod

      let paymentMethodId: string
      if (shouldCreateNewCard) {
        // Create payment method using the card token
        const paymentMethod = await stripe.paymentMethods.create({
          type: 'card',
          card: { token: body.newPaymentMethod!.token },
          billing_details: {
            name: body.newPaymentMethod!.name,
            address: {
              country: body.newPaymentMethod!.country,
              postal_code: body.newPaymentMethod!.postalCode,
            },
          },
        })

        // Attach payment method to customer
        await stripe.paymentMethods.attach(paymentMethod.id, {
          customer: req.user.stripeCustomerId!,
        })

        paymentMethodId = paymentMethod.id
      } else {
        paymentMethodId = body.paymentMethodId!
      }

      const game = await getGameById(params.id)
      const currentGameRegistrations = await getRegistrationsByGameId(game.id)

      const newGameRegistrationCount = currentGameRegistrations.length + body.playerCount

      if (newGameRegistrationCount > game.maxPlayers) {
        return Response.json({ error: 'Game is full' }, { status: 400 })
      }

      // Convert to cents
      const amount = (game.price + BOOKING_FEE) * body.playerCount * 100

      // Create a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        payment_method: paymentMethodId,
        payment_method_types: ['card'],
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
      return Response.json({ error: 'Invalid payment data' }, { status: 400 })
    }
  },
}

export default createPaymentIntentEndpoint
