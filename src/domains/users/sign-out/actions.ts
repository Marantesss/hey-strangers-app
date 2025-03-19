'use server'

import { signOut } from '@/domains/users/shared/UserService'
import { redirect } from 'next/navigation'

export async function signOutAction() {
  await signOut()
  redirect('/')
}
