'use client'

import useGamesQuery from '@/domains/games/get-games/use-games.query'
import GameCard from '@/domains/games/shared/components/GameCard'
import GameCardSkeleton from '@/domains/games/shared/components/GameCardSkeleton'

type AgendaClientPageProps = {
  city?: string
  sport?: string
}

const AgendaClientPage: React.FC<AgendaClientPageProps> = ({ city, sport }) => {
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
    </div>
  )
}

export default AgendaClientPage
