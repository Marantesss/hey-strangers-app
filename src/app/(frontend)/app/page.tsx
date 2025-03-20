import { getCurrentUser } from '@/domains/users/shared/UserService'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'

const AppPage: NextPage = async () => {
  const user = await getCurrentUser()

  if (user) {
    return redirect('/app/agenda')
  }

  return redirect('/sign-in')
}

export default AppPage
