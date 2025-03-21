import { createContext } from 'react'

interface IRegisterForGameContext {
  gameId: string | null
  setGameId: (gameId: string) => void
  isOpen: boolean
  toggleOpen: (isOpen?: boolean) => void
}

const RegisterForGameContext = createContext<IRegisterForGameContext>({
  gameId: null,
  setGameId: () => {},
  isOpen: false,
  toggleOpen: () => {},
})

export default RegisterForGameContext
