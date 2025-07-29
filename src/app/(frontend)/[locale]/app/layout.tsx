import { PropsWithChildren } from 'react'
import AppNavigationMenu from '@/components/common/AppNavigationMenu'
import { getMe } from '@/domains/users/me/me.service'
import { redirect } from 'next/navigation'
import SessionProvider from '@/domains/users/session/SessionProvider'
import AppNavbar from '@/components/common/AppNavbar'
import { debugAuth } from '@/lib/auth-debug'

const AppLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  // Debug de autenticação é ativado automaticamente se DEBUG_AUTH=true
  // no arquivo .env (ou variável de ambiente)
  await debugAuth()

  const user = await getMe()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <SessionProvider>
      <div className="min-h-screen container space-y-2">
        <AppNavbar />

        <div className="flex justify-center">
          <AppNavigationMenu />
        </div>

        <div>{children}</div>
      </div>
    </SessionProvider>
  )
}

export default AppLayout
