import { PropsWithChildren } from 'react'
import AppNavigationMenu from '@/components/common/AppNavigationMenu'
import SessionProvider from '@/domains/users/session/SessionProvider'
import AppNavbar from '@/components/common/AppNavbar'

const AppLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <SessionProvider>
      <div className="min-h-screen container space-y-2">
        <AppNavbar />

        <div>{children}</div>
      </div>
    </SessionProvider>
  )
}

export default AppLayout
