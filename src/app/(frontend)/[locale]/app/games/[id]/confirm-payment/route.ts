import { getGameById } from '@/domains/games/get-game-by-id/get-game-by-id.service'
import { registerForGame } from '@/domains/registrations/register-for-game/register-for-game.service'
import { RegisterForGamePaymentConfirmationSchema } from '@/domains/registrations/register-for-game/schema'
import { getMe } from '@/domains/users/me/me.service'
import stripe from '@/lib/stripe'
import { getLocale } from 'next-intl/server'
import { NextRequest, NextResponse } from 'next/server'

type Params = {
  id: string
}

export const GET = async (request: NextRequest, { params }: { params: Promise<Params> }) => {
  const { id } = await params
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const paymentIntentId = searchParams.get('payment_intent')

  const locale = await getLocale()
  const user = await getMe()

  if (!user) {
    return NextResponse.redirect(new URL(`${locale}/app/games`, request.url))
  }

  const { data, error } = RegisterForGamePaymentConfirmationSchema.safeParse({
    paymentIntentId,
  })

  if (error) {
    console.error('Invalid payment intent ID', paymentIntentId)
    return NextResponse.redirect(new URL(`${locale}/app/games`, request.url))
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(data.paymentIntentId)
  if (paymentIntent.status !== 'succeeded') {
    console.error('Payment intent status is not succeeded', paymentIntent.status)
    return NextResponse.redirect(new URL(`${locale}/app/games`, request.url))
  }

  const playerCount = parseInt(paymentIntent.metadata.playerCount)
  const gameId = paymentIntent.metadata.gameId
  const userId = paymentIntent.metadata.userId

  if (!gameId || !userId || !playerCount) {
    console.error('Invalid payment intent metadata', paymentIntent.metadata)
    return NextResponse.redirect(new URL(`${locale}/app/games`, request.url))
  }

  if (gameId !== id) {
    console.error('Game ID mismatch', `from stripe: ${gameId}, from url: ${id}`)
    return NextResponse.redirect(new URL(`${locale}/app/games`, request.url))
  }

  const game = await getGameById(gameId)
  if (!game) {
    console.error('Game not found', gameId)
    return NextResponse.redirect(new URL(`${locale}/app/games`, request.url))
  }

  await registerForGame({
    gameId: game.id,
    userId: user.id,
    paymentIntentId: data.paymentIntentId,
    playerCount,
  })

  return NextResponse.redirect(
    new URL(`${locale}/app/games?registeredGame=${gameId}&timeFrame=future`, request.url),
  )
}
