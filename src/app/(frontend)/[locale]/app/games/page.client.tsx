'use client'

import useGamesQuery from '@/domains/games/get-games/use-games.query'
import GameCard from '@/domains/games/shared/components/GameCard'
import GameCardSkeleton from '@/domains/games/shared/components/GameCardSkeleton'

type GamesClientPageProps = {
  timeFrame?: 'past' | 'future'
  registeredGame?: string
}

const GamesClientPage: React.FC<GamesClientPageProps> = ({ timeFrame, registeredGame }) => {
  const { data: games, isLoading } = useGamesQuery({
    options: {
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
          <GameCard highlight={game.id === registeredGame} key={game.id} game={game} />
        ))}
      {!hasGames && <div className="text-center text-sm text-muted-foreground">No games found</div>}
    </div>
  )
}

export default GamesClientPage
