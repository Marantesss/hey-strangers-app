import { getCurrentUser } from '@/domains/users/shared/UserService'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'

const AppPage: NextPage = async () => {
  const user = await getCurrentUser()

  if (user) {
    return <div>logged in</div>
  }

  return redirect('/sign-in')
}

export default AppPage
