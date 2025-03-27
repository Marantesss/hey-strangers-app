import { getMe } from '@/domains/users/me/me.service'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'

const AppPage: NextPage = async () => {
  const user = await getMe()

  if (user) {
    return redirect('/app/agenda')
  }

  return redirect('/sign-in')
}

export default AppPage
