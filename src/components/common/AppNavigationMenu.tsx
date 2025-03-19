"use client"

import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, navigationMenuTriggerStyle } from "../ui/navigation-menu"

const AppNavigationMenu: React.FC = () => {
  const pathname = usePathname();


  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/agenda')}
            className={navigationMenuTriggerStyle()}
            href="/app/agenda"
          >
            Agenda
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/games')}
            className={navigationMenuTriggerStyle()}
            href="/app/games"
          >
            My Games
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/profile')}
            className={navigationMenuTriggerStyle()}
            href="/app/profile"
          >
            My Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default AppNavigationMenu;

