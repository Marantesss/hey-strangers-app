'use client'

import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'

import RegisterForGameContext from '../contexts/register-for-game.context'

const RegisterForGameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [gameId, setGameId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback((isOpen?: boolean) => {
    setIsOpen((_) => isOpen ?? !_)
  }, [])

  const context = useMemo(
    () => ({ gameId, isOpen, toggleOpen, setGameId }),
    [gameId, isOpen, toggleOpen, setGameId],
  )

  return (
    <RegisterForGameContext.Provider value={context}>{children}</RegisterForGameContext.Provider>
  )
}

export default RegisterForGameProvider
