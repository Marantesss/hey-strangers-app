'use client'

import useGamesQuery from '@/domains/games/get-games/use-games.query'
import GameCard from '@/domains/games/shared/components/GameCard'
import GameCardSkeleton from '@/domains/games/shared/components/GameCardSkeleton'
import { useTranslations } from 'next-intl'

type AgendaClientPageProps = {
  city?: string
  sport?: string
}

const AgendaClientPage: React.FC<AgendaClientPageProps> = ({ city, sport }) => {
  const t = useTranslations('agenda')
  const { data: games, isLoading } = useGamesQuery({
    options: {
      cityName: city,
      sportId: sport,
      timeFrame: 'future',
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
      {hasGames && games?.map((game) => <GameCard key={game.id} game={game} />)}
      {!hasGames && (
        <div className="text-center text-sm text-muted-foreground">{t('no-games-found')}</div>
      )}
    </div>
  )
}

export default AgendaClientPage
