import SelectCity from '@/domains/games/filter-by-city/SelectCity'
import SelectSport from '@/domains/games/filter-by-sport/SelectSport'
import { getGames } from '@/domains/games/shared/GameService'
import RegisterForGameSheet from '@/domains/registrations/register-for-game/components/RegisterForGameSheet'
import RegisterForGameProvider from '@/domains/registrations/register-for-game/providers/RegisterForGameProvider'
import { NextPage } from 'next'
import AgendaClientPage from './page.client'

type AgendaPageProps = {
  searchParams: Promise<{
    city?: string
    sport?: string
  }>
}

const AgendaPage: NextPage<AgendaPageProps> = async ({ searchParams }) => {
  const { city, sport } = await searchParams

  return (
    <main className="space-y-8 my-8">
      <RegisterForGameProvider>
        <RegisterForGameSheet />
        <h1 className="text-5xl font-bold text-center">Book your next game</h1>

        <div className="max-w-xs mx-auto space-y-4">
          <SelectCity />
          <SelectSport />
        </div>

        <AgendaClientPage city={city} sport={sport} />
      </RegisterForGameProvider>
    </main>
  )
}

export default AgendaPage
