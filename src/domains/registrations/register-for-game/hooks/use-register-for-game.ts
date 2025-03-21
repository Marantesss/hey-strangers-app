import { useContext } from 'react'
import RegisterForGameContext from '../contexts/register-for-game.context'

const useRegisterFormGame = () => useContext(RegisterForGameContext)

export default useRegisterFormGame
