import { cn } from '@/lib/utils'
import { NextPage } from 'next'

import { Link } from '@/i18n/navigation'
import GamesClientPage from './page.client'

interface PageProps {
  searchParams: Promise<{
    timeFrame?: 'past' | 'future'
    registeredGame?: string
  }>
}

const GamesPage: NextPage<PageProps> = async ({ searchParams }) => {
  const { timeFrame = 'past', registeredGame } = await searchParams

  const selectedStyle = 'bg-[#E3FFCD] text-primary'
  const defaultStyle = 'bg-[#F9F9FB] text-[#454745]'

  return (
    <main className="space-y-8 my-8">
      <div className="flex justify-center gap-4">
        <Link
          href="/app/games?timeFrame=past"
          className={cn(
            'px-4 py-2 rounded-lg font-semibold',
            timeFrame === 'past' ? selectedStyle : defaultStyle,
          )}
        >
          Past Games
        </Link>
        <Link
          href="/app/games?timeFrame=future"
          className={cn(
            'px-4 py-2 rounded-lg font-semibold',
            timeFrame === 'future' ? selectedStyle : defaultStyle,
          )}
        >
          Upcoming Games
        </Link>
      </div>

      <GamesClientPage timeFrame={timeFrame} registeredGame={registeredGame} />
    </main>
  )
}

export default GamesPage
