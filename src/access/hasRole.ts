import { Access } from 'payload'

type AuthCollection = 'admins' | 'users'

export const hasRole =
  (role: AuthCollection): Access =>
  ({ req: { user } }) => {
    return user?.collection === role
  }
