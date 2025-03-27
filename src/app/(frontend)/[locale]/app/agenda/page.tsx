import SelectCity from '@/domains/games/filter-by-city/SelectCity'
import SelectSport from '@/domains/games/filter-by-sport/SelectSport'
import GameCard from '@/domains/games/shared/components/GameCard'
import { getGames } from '@/domains/games/shared/GameService'
import RegisterForGameSheet from '@/domains/registrations/register-for-game/components/RegisterForGameSheet'
import RegisterForGameProvider from '@/domains/registrations/register-for-game/providers/RegisterForGameProvider'
import { Game } from '@/payload-types'
import { NextPage } from 'next'
import { TypedLocale } from 'payload'

type AgendaPageProps = {
  searchParams: Promise<{
    city?: string
    sport?: string
  }>
}

const AgendaPage: NextPage<AgendaPageProps> = async ({ searchParams }) => {
  const { city, sport } = await searchParams
  const games = await getGames(
    { city, sportId: sport, timeFrame: 'future' },
    { expand: { field: true } },
  )

  return (
    <main className="space-y-8 my-8">
      <RegisterForGameProvider>
        <RegisterForGameSheet />
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
      </RegisterForGameProvider>
    </main>
  )
}

export default AgendaPage
