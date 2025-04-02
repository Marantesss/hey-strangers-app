import SelectCityFilter from '@/domains/games/filter-by-city/SelectCityFilter'
import SelectSportFilter from '@/domains/games/filter-by-sport/SelectSportFilter'
import RegisterForGameSheet from '@/domains/registrations/register-for-game/components/RegisterForGameSheet'
import RegisterForGameProvider from '@/domains/registrations/register-for-game/providers/RegisterForGameProvider'
import { NextPage } from 'next'
import AgendaClientPage from './page.client'
import { getTranslations } from 'next-intl/server'

type AgendaPageProps = {
  searchParams: Promise<{
    city?: string
    sport?: string
  }>
}

const AgendaPage: NextPage<AgendaPageProps> = async ({ searchParams }) => {
  const { city, sport } = await searchParams
  const t = await getTranslations('agenda')

  return (
    <main className="space-y-8 my-8">
      <RegisterForGameProvider>
        <RegisterForGameSheet />
        <h1 className="text-5xl font-bold text-center">{t('title')}</h1>

        <div className="max-w-xs mx-auto space-y-4">
          <SelectCityFilter />
          <SelectSportFilter />
        </div>

        <AgendaClientPage city={city} sport={sport} />
      </RegisterForGameProvider>
    </main>
  )
}

export default AgendaPage
