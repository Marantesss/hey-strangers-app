import { addDataAndFileToRequest, Endpoint } from 'payload'
import { getGameById } from '../get-game-by-id/get-game-by-id.service'
import { getRegistrationsByGameId } from '@/domains/registrations/get-registrations-by-game/get-registrations-by-game-id.service'
import stripe from '@/lib/stripe'
import { PaymentIntentParamsSchema, PaymentIntentBodySchema } from './schema'
import { getUserById } from '@/domains/users/get-user/get-user.service'
import { User } from '@/payload-types'

const createPaymentIntentEndpoint: Endpoint = {
  path: '/:id/payment-intent',
  method: 'post',
  handler: async (req) => {
    await addDataAndFileToRequest(req)
    const { data: params, error: paramsError } = PaymentIntentParamsSchema.safeParse(
      req.routeParams,
    )
    const { data: body, error: bodyError } = PaymentIntentBodySchema.safeParse(req.data)

    if (paramsError || bodyError) {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }

    const isUserOrGuest = (req.user && req.user.collection === 'users') || !!body.inviterId

    if (!isUserOrGuest) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let userForReservation: User
    if (body.inviterId) {
      try {
        userForReservation = await getUserById(body.inviterId)
      } catch (error) {
        return Response.json({ error: 'Invalid inviterId' }, { status: 400 })
      }
    } else {
      userForReservation = req.user as User
    }

    try {
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

        if (!body.inviterId) {
          // Attach payment method to customer
          await stripe.paymentMethods.attach(paymentMethod.id, {
            customer: userForReservation.stripeCustomerId!,
          })
        }

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
      const amount = (game.price + game.bookingFee) * body.playerCount * 100

      // Create a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        payment_method: paymentMethodId,
        payment_method_types: ['card'],
        customer: userForReservation.stripeCustomerId ?? undefined,
        metadata: {
          gameId: game.id,
          playerCount: body.playerCount.toString(),
          userId: userForReservation.id,
          isGuest: !!body.inviterId ? 'true' : 'false',
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
