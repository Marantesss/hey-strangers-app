import { useContext } from 'react'

import SessionContext from './session.context'

const useSession = () => useContext(SessionContext)

export default useSession
