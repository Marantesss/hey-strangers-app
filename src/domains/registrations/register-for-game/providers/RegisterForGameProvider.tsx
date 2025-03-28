'use client'

import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'

import RegisterForGameContext from '../contexts/register-for-game.context'
import { GameModel } from '@/domains/games/shared/models/Game.model'
const RegisterForGameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [game, setGame] = useState<GameModel | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback((isOpen?: boolean) => {
    setIsOpen((_) => isOpen ?? !_)
  }, [])

  const context = useMemo(
    () => ({ game, isOpen, toggleOpen, setGame }),
    [game, isOpen, toggleOpen, setGame],
  )

  return (
    <RegisterForGameContext.Provider value={context}>{children}</RegisterForGameContext.Provider>
  )
}

export default RegisterForGameProvider
