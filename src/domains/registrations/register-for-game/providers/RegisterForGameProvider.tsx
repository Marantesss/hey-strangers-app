'use client'

import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'
import RegisterForGameContext from '../contexts/register-for-game.context'
import { GameModel } from '@/domains/games/shared/models/Game.model'

interface RegisterForGameProviderProps extends PropsWithChildren {
  inviterId?: string | null
}

const RegisterForGameProvider: React.FC<RegisterForGameProviderProps> = ({
  inviterId = null,
  children,
}) => {
  const [game, setGame] = useState<GameModel | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback((isOpen?: boolean) => {
    setIsOpen((_) => isOpen ?? !_)
  }, [])

  const context = useMemo(
    () => ({ game, isOpen, toggleOpen, setGame, inviterId }),
    [game, isOpen, toggleOpen, setGame, inviterId],
  )

  return (
    <RegisterForGameContext.Provider value={context}>{children}</RegisterForGameContext.Provider>
  )
}

export default RegisterForGameProvider
