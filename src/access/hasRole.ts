import { Access, FieldAccess } from 'payload'

type AuthCollection = 'admins' | 'users'

export const hasRole =
  (role: AuthCollection): Access & FieldAccess =>
  ({ req: { user } }) => {
    return user?.collection === role
  }
