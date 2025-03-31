'use client'

import { Button } from '@/components/ui/button'
import useRegisterFormGame from '../hooks/use-register-for-game'
import { GameModel } from '@/domains/games/shared/models/Game.model'
import useSession from '@/domains/users/session/use-session'
import { cn } from '@/lib/utils'

interface RegisterForGameButtonProps {
  game: GameModel
}

const RegisterForGameButton: React.FC<RegisterForGameButtonProps> = ({ game }) => {
  const { user } = useSession()
  const { toggleOpen, setGame } = useRegisterFormGame()

  const isRegistered = user ? game.isUserRegistered(user?.id) : false

  const isDisabled = game.isFull || !user || isRegistered

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
      {isRegistered ? 'Registered' : 'Register for game'}
    </Button>
  )
}

export default RegisterForGameButton
