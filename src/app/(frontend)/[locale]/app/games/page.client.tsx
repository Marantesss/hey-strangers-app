'use client'

import useGamesQuery from '@/domains/games/get-games/use-games.query'
import GameCard from '@/domains/games/shared/components/GameCard'
import GameCardSkeleton from '@/domains/games/shared/components/GameCardSkeleton'
import useSession from '@/domains/users/session/use-session'
import { useTranslations } from 'next-intl'

type GamesClientPageProps = {
  timeFrame?: 'past' | 'future'
  registeredGame?: string
}

const GamesClientPage: React.FC<GamesClientPageProps> = ({ timeFrame, registeredGame }) => {
  const { user } = useSession()
  const t = useTranslations('games')

  const { data: games, isLoading } = useGamesQuery({
    options: {
      userId: user?.id,
      timeFrame,
    },
    expand: { field: true },
  })

  const hasGames = !!games?.length

  return (
    <div className="max-w-lg mx-auto space-y-4">
      {isLoading && (
        <>
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
        </>
      )}
      {hasGames &&
        games!.map((game) => (
          <GameCard highlight={game.id === registeredGame} key={game.id} game={game} simple />
        ))}
      {!hasGames && (
        <div className="text-center text-sm text-muted-foreground">{t('no-games-found')}</div>
      )}
    </div>
  )
}

export default GamesClientPage
