'use client'

import { Button } from '@/components/ui/button'
import useRegisterFormGame from '../hooks/use-register-for-game'
import { GameModel } from '@/domains/games/shared/models/Game.model'
import useSession from '@/domains/users/session/use-session'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface RegisterForGameButtonProps {
  game: GameModel
}

const RegisterForGameButton: React.FC<RegisterForGameButtonProps> = ({ game }) => {
  const { user } = useSession()
  const { toggleOpen, setGame, inviterId } = useRegisterFormGame()
  const t = useTranslations('components.game-card.register-button')

  const isRegistered = user ? game.isUserRegistered(user?.id) : inviterId ? false : true

  const isDisabled = game.isFull || (!user && !inviterId) || isRegistered

  return (
    <Button
      disabled={isDisabled}
      onClick={() => {
        setGame(game)
        toggleOpen()
      }}
      className={cn('w-full', {
        'bg-[#E3FFCD] text-primary': isRegistered,
      })}
    >
      {isRegistered
        ? t('registered')
        : !game.isFull
          ? t('register-for-game')
          : t('the-game-is-full')}
    </Button>
  )
}

export default RegisterForGameButton
