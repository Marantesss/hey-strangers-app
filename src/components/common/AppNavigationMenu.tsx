'use client'

import { usePathname } from '@/i18n/navigation'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { useLocale, useTranslations } from 'next-intl'

const AppNavigationMenu: React.FC = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('components.app-navigation-menu')

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/agenda')}
            className={navigationMenuTriggerStyle()}
            href={`/${locale}/app/agenda`}
          >
            {t('agenda')}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/games')}
            className={navigationMenuTriggerStyle()}
            href={`/${locale}/app/games`}
          >
            {t('my-games')}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.includes('/app/profile')}
            className={navigationMenuTriggerStyle()}
            href={`/${locale}/app/profile`}
          >
            {t('my-profile')}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default AppNavigationMenu
