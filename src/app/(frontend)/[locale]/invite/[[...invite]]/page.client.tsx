'use client'

import useGameQuery from '@/domains/games/get-game-by-id/use-game.query'
import GameCard from '@/domains/games/shared/components/GameCard'
import GameCardSkeleton from '@/domains/games/shared/components/GameCardSkeleton'
import { useTranslations } from 'next-intl'

type InviteClientPageProps = {
  gameId: string
  registration?: 'success' | 'error'
}

const InviteClientPage: React.FC<InviteClientPageProps> = ({ gameId, registration }) => {
  const t = useTranslations('invite')
  const { data: game, isLoading } = useGameQuery({ gameId, expand: { field: true } })

  return (
    <div className="max-w-lg mx-auto space-y-4">
      {isLoading ? (
        <GameCardSkeleton />
      ) : !!game ? (
        <GameCard game={game} disabled={registration === 'success'} />
      ) : (
        <div className="text-center text-sm text-muted-foreground">{t('no-game-found')}</div>
      )}
    </div>
  )
}

export default InviteClientPage
