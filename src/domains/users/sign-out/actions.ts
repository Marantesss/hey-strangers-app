'use server'

import { redirect } from 'next/navigation'
import { signOut } from './sign-out.service'

export async function signOutAction() {
  await signOut()
  redirect('/')
}
