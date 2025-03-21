import { createContext } from 'react'

import { UserModel } from '../shared/models/User.model'

interface ISessionContext {
  user: UserModel
  token: string
  exp: number
}

interface ISessionLoading {
  user: null
  token: null
  exp: null
}

export type Session = ISessionContext | ISessionLoading

const SessionContext = createContext<Session>({
  user: null,
  token: null,
  exp: null,
})

export default SessionContext
