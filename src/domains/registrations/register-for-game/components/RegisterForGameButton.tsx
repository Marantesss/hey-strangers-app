'use client'

import { Button } from '@/components/ui/button'
import useRegisterFormGame from '../hooks/use-register-for-game'
import { GameModel } from '@/domains/games/shared/models/Game.model'

interface RegisterForGameButtonProps {
  game: GameModel
}

const RegisterForGameButton: React.FC<RegisterForGameButtonProps> = ({ game }) => {
  const { toggleOpen, setGame } = useRegisterFormGame()

  return (
    <Button
      className="w-full"
      onClick={() => {
        setGame(game)
        toggleOpen()
      }}
    >
      Register for game
    </Button>
  )
}

export default RegisterForGameButton
