'use client'

import { Button } from '@/components/ui/button'
import useRegisterFormGame from '../hooks/use-register-for-game'

interface RegisterForGameButtonProps {
  gameId: string
}

const RegisterForGameButton: React.FC<RegisterForGameButtonProps> = ({ gameId }) => {
  const { toggleOpen, setGameId } = useRegisterFormGame()

  return (
    <Button
      className="w-full"
      onClick={() => {
        setGameId(gameId)
        toggleOpen()
      }}
    >
      Register for game
    </Button>
  )
}

export default RegisterForGameButton
