'use server'

import { getGameById } from '@/domains/games/get-game-by-id/get-game-by-id.service'
import stripe from '@/lib/stripe'
import { z } from 'zod'
import { getRegistrationsByGameId } from '../get-registration/get-registration.service'
import { getMe } from '@/domains/users/me/me.service'
import { redirect } from 'next/navigation'
import { registerForGame } from './register-for-game.service'

const PaymentIntentSchema = z.object({
  gameId: z.string(),
  playerCount: z.number().positive().default(1),
  paymentMethodId: z.string(),
})

interface CreatePaymentIntentResponse {
  clientSecret?: string | null
  error?: string
}

export async function createPaymentIntent(
  previousState: CreatePaymentIntentResponse,
  formData: FormData,
): Promise<CreatePaymentIntentResponse> {
  const result = PaymentIntentSchema.safeParse({
    gameId: formData.get('gameId'),
    playerCount: Number(formData.get('playerCount')),
    paymentMethodId: formData.get('paymentMethodId'),
  })

  if (!result.success) {
    return { error: 'Invalid payment data provided' }
  }

  const user = await getMe()
  if (!user) {
    return redirect('/login')
  }

  const game = await getGameById(result.data.gameId)
  const currentGameRegistrations = await getRegistrationsByGameId(game.id)

  const newGameRegistrationCount = currentGameRegistrations.length + result.data.playerCount

  if (newGameRegistrationCount > game.maxPlayers) {
    return { error: 'Game is full' }
  }

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: game.price * result.data.playerCount * 100, // Convert to cents
      currency: 'eur',
      payment_method: result.data.paymentMethodId,
      confirm: true,
      metadata: {
        gameId: game.id,
        playerCount: result.data.playerCount.toString(),
        userId: user.id,
      },
    })

    if (paymentIntent.status !== 'succeeded') {
      return { error: 'Payment failed' }
    }

    await registerForGame({
      gameId: game.id,
      userId: user.id,
      paymentIntentId: paymentIntent.id,
      playerCount: result.data.playerCount,
    })

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error('Payment failed:', error)
    return { error: 'Payment failed' }
  }
}
