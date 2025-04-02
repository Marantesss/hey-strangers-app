import { getGameById } from '@/domains/games/get-game-by-id/get-game-by-id.service'
import { registerForGame } from '@/domains/registrations/register-for-game/register-for-game.service'
import { RegisterForGamePaymentConfirmationSchema } from '@/domains/registrations/register-for-game/schema'
import { getUserById } from '@/domains/users/get-user/get-user.service'
import { getMe } from '@/domains/users/me/me.service'
import { UserModel } from '@/domains/users/shared/models/User.model'
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
  const isGuest = searchParams.get('is_guest')

  const locale = await getLocale()

  const { data, error } = RegisterForGamePaymentConfirmationSchema.safeParse({
    paymentIntentId,
    isGuest,
  })

  if (error) {
    console.error('Invalid payment intent ID or isGuest param', paymentIntentId, isGuest)
    return NextResponse.redirect(new URL(`/${locale}/app/games`, request.url))
  }

  const handleResponse = async (reason: 'success' | 'error' | 'need-auth') => {
    if (reason === 'need-auth') {
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url))
    }

    if (data.isGuest) {
      const inviterUser = await getUserById(userId)
      const inviterUserModel = UserModel.from(inviterUser)
      return NextResponse.redirect(
        new URL(
          `/${locale}/invite/${inviterUserModel.id}/${inviterUserModel.slugifiedName}/${game.id}?registration=${reason}`,
          request.url,
        ),
      )
    }

    if (reason === 'error') {
      return NextResponse.redirect(new URL(`/${locale}/app/games`, request.url))
    }

    if (reason === 'success') {
      return NextResponse.redirect(
        new URL(`/${locale}/app/games?registeredGame=${game.id}&timeFrame=future`, request.url),
      )
    }
  }

  const user = await getMe()
  if (!user && !data.isGuest) {
    return handleResponse('need-auth')
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(data.paymentIntentId)
  if (paymentIntent.status !== 'succeeded') {
    console.error('Payment intent status is not succeeded', paymentIntent.status)
    return handleResponse('error')
  }

  const playerCount = parseInt(paymentIntent.metadata.playerCount)
  const gameId = paymentIntent.metadata.gameId
  const userId = paymentIntent.metadata.userId
  const isGuestMetadata = paymentIntent.metadata.isGuest === 'true'

  if ((isGuestMetadata && !data.isGuest) || (!isGuestMetadata && data.isGuest)) {
    console.error('Guest status mismatch', `from stripe: ${isGuestMetadata}, from url: ${isGuest}`)
    return handleResponse('error')
  }

  if (!gameId || !userId || !playerCount) {
    console.error('Invalid payment intent metadata', paymentIntent.metadata)
    return handleResponse('error')
  }

  if (gameId !== id) {
    console.error('Game ID mismatch', `from stripe: ${gameId}, from url: ${id}`)
    return handleResponse('error')
  }

  const game = await getGameById(gameId)
  if (!game) {
    console.error('Game not found', gameId)
    return handleResponse('error')
  }

  await registerForGame({
    gameId: game.id,
    userId: userId,
    paymentIntentId: data.paymentIntentId,
    playerCount,
    isGuest: data.isGuest,
  })

  return handleResponse('success')
}
