'use client'

import Logo from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import useSession from '@/domains/users/session/use-session'
import { signOutAction } from '@/domains/users/sign-out/actions'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useActionState } from 'react'
import LocaleSwitcher from './LocaleSwitcher'

const AppNavbar = () => {
  const { user } = useSession()
  const [, formAction, isPending] = useActionState(signOutAction, null)
  const t = useTranslations('components.app-navbar')

  return (
    <nav className="flex items-center justify-between py-8">
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        {user ? (
          <Button variant="ghost" formAction={formAction} disabled={isPending}>
            {t('sign-out')}
          </Button>
        ) : (
          <Button asChild>
            <Link href="/sign-up">{t('register')}</Link>
          </Button>
        )}
        <Button asChild>
          <Link href="/app">{t('my-space')}</Link>
        </Button>
      </div>
    </nav>
  )
}

export default AppNavbar
