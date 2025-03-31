import { getGameById } from '@/domains/games/get-game-by-id/get-game-by-id.service'
import { notFound } from 'next/navigation'
import { TypedLocale } from 'payload'

type InvitePageProps = {
  params: Promise<{
    locale: TypedLocale
    invite: string[]
  }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const {
    invite: [userId, userSlug, gameId],
    locale = 'en',
  } = await params

  if (!userId || !userSlug || !gameId) {
    notFound()
  }

  const game = await getGameById(gameId, locale)

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      <p>{game.price}</p>
      <p>{game.maxPlayers}</p>
      <p>{game.sport.name}</p>
      <p>{game.field.name}</p>
    </div>
  )
}
