import SelectCity from '@/domains/games/filter-by-city/SelectCity'
import SelectSport from '@/domains/games/filter-by-sport/SelectSport'
import GameCard from '@/domains/games/shared/components/GameCard'
import { getGames } from '@/domains/games/shared/GameService'
import { Game } from '@/payload-types'
import { NextPage } from 'next'

type AgendaPageProps = {
  searchParams: Promise<{
    city?: string
    sport?: string
  }>
}

const AgendaPage: NextPage<AgendaPageProps> = async ({ searchParams }) => {
  const { city, sport } = await searchParams
  const games = await getGames(
    { city, sport: sport as Game['sport'], timeFrame: 'future' },
    { expand: { field: true } },
  )

  return (
    <main className="space-y-8 my-8">
      <h1 className="text-5xl font-bold text-center">Book your next game</h1>

      <div className="max-w-xs mx-auto space-y-4">
        <SelectCity />
        <SelectSport />
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  )
}

export default AgendaPage
