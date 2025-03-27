import Logo from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { PropsWithChildren } from 'react'
import AppNavigationMenu from '@/components/common/AppNavigationMenu'
import { signOutAction } from '@/domains/users/sign-out/actions'
import { getMe } from '@/domains/users/me/me.service'
import { redirect } from 'next/navigation'
import SessionProvider from '@/domains/users/session/SessionProvider'

const AppLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const user = await getMe()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <SessionProvider>
      <div className="min-h-screen container space-y-2">
        <nav className="flex items-center justify-between py-8">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={signOutAction}>
              Sign Out
            </Button>
            <Button>O meu espaço</Button>
          </div>
        </nav>

        <div className="flex justify-center">
          <AppNavigationMenu />
        </div>

        <div>{children}</div>
      </div>
    </SessionProvider>
  )
}

export default AppLayout
