import { getMe } from '@/domains/users/me/me.service'
import { redirect } from '@/i18n/navigation'
import { NextPage } from 'next'
import { TypedLocale } from 'payload'

type AppPageProps = {
  params: Promise<{ locale: TypedLocale }>
}

const AppPage: NextPage<AppPageProps> = async ({ params }) => {
  const { locale } = await params
  const user = await getMe()

  if (user) {
    return redirect({ href: '/app/agenda', locale })
  }

  return redirect({ href: '/sign-in', locale })
}

export default AppPage
