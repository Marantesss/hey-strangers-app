import { Access } from 'payload'

export const isAuthenticated =
  (): Access =>
  ({ req: { user } }) => {
    return !!user
  }
