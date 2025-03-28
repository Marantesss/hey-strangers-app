import { GameModel } from '@/domains/games/shared/models/Game.model'
import { createContext } from 'react'

interface IRegisterForGameContext {
  game: GameModel | null
  setGame: (game: GameModel) => void
  isOpen: boolean
  toggleOpen: (isOpen?: boolean) => void
}

const RegisterForGameContext = createContext<IRegisterForGameContext>({
  game: null,
  setGame: () => {},
  isOpen: false,
  toggleOpen: () => {},
})

export default RegisterForGameContext
