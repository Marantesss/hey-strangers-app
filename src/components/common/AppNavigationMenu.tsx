'use client'

import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { useLocale } from 'next-intl'

const AppNavigationMenu: React.FC = () => {
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/agenda')}
            className={navigationMenuTriggerStyle()}
            href={`/${locale}/app/agenda`}
          >
            Agenda
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/games')}
            className={navigationMenuTriggerStyle()}
            href={`/${locale}/app/games`}
          >
            My Games
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/profile')}
            className={navigationMenuTriggerStyle()}
            href={`/${locale}/app/profile`}
          >
            My Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default AppNavigationMenu
