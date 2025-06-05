'use client'

import Logo from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import useSession from '@/domains/users/session/use-session'
import { signOutAction } from '@/domains/users/sign-out/actions'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { startTransition, useActionState } from 'react'
import LocaleSwitcher from './LocaleSwitcher'
import { useState, useEffect } from 'react'

const AppNavbar = () => {
  const { user } = useSession()
  const [, formAction, isPending] = useActionState(signOutAction, null)
  const t = useTranslations('components.app-navbar')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      setShowMenu(true)
    } else {
      const timeout = setTimeout(() => setShowMenu(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [menuOpen])

  const onSignOut = () => {
    startTransition(() => {
      formAction()
    })
  }

  return (
    <nav className="flex items-center justify-between py-8 px-4">
      <Link href="/">
        <Logo />
      </Link>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <LocaleSwitcher />
        {user ? (
          <Button variant="ghost" onClick={onSignOut} disabled={isPending}>
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
      {/* Mobile: Ícone do menu hambúrguer */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-6 h-6"
        aria-label="Abrir menu"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        <span className="block w-6 h-0.5 bg-black mb-1 rounded"></span>
        <span className="block w-6 h-0.5 bg-black mb-1 rounded"></span>
        <span className="block w-6 h-0.5 bg-black rounded"></span>
      </button>
      {/* Menu lateral mobile com animação */}
      {showMenu && (
        <>
          {/* Sombra fixa cobrindo toda a tela */}
          <div
            className={`fixed inset-0 z-40 bg-black/30 ease-out ${menuOpen ? 'animate-fade-in' : 'animate-fade-out'}`}
            onClick={() => setMenuOpen(false)}
          />
          {/* Menu lateral animado */}
          <div
            className={`fixed top-0 right-0 w-2/3 max-w-xs h-full bg-white z-50 shadow-lg flex flex-col p-6 gap-4 ease-out ${menuOpen ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}
          >
            <button
              className="self-end mb-4 h-6 w-6"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
              type="button"
            >
              <span className="block w-6 h-1 bg-black rotate-45 origin-center translate-y-1"></span>
              <span className="block w-6 h-1 bg-black -rotate-45 origin-center "></span>
            </button>
            <LocaleSwitcher />
            {user ? (
              <Button
                variant="ghost"
                onClick={() => {
                  setMenuOpen(false)
                  onSignOut()
                }}
                disabled={isPending}
                className="w-full"
              >
                {t('sign-out')}
              </Button>
            ) : (
              <Button asChild variant="ghost" className="w-full">
                <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                  {t('register')}
                </Link>
              </Button>
            )}
            <Button asChild className="w-full">
              <Link href="/app" onClick={() => setMenuOpen(false)}>
                {t('my-space')}
              </Link>
            </Button>
          </div>
        </>
      )}
    </nav>
  )
}

export default AppNavbar
