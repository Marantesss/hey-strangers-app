'use client'

import { useMemo, type PropsWithChildren } from 'react'

import SessionContext, { type Session } from './session.context'
import useMeQuery from '../me/use-me.query'
import { UserModel } from '../shared/models/User.model'

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data } = useMeQuery()

  const context = useMemo<Session>(
    () =>
      data?.user
        ? { user: UserModel.from(data.user), exp: data.exp, token: data.token }
        : { user: null, exp: null, token: null },
    [data],
  )

  return <SessionContext.Provider value={context}>{children}</SessionContext.Provider>
}

export default SessionProvider
