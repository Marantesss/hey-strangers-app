import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/features/user/actions";
import { PropsWithChildren } from "react";
import AppNavigationMenu from "@/components/common/AppNavigationMenu";

const AppLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div className="min-h-screen container space-y-2">

      <nav className="flex items-center justify-between py-8">
        <Logo />
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={signOutAction}>
            Sign Out
          </Button>
          <Button >
            O meu espaço
          </Button>
        </div>
      </nav>

      <div className="flex justify-center">
        <AppNavigationMenu />
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}

export default AppLayout;