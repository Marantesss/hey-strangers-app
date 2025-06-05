'use client'

import { Link } from '@/i18n/navigation'
import LocaleSwitcher from '../common/LocaleSwitcher'
import Logo from '../common/Logo'
import { Button } from '../ui/button'
import { getTranslations } from 'next-intl/server'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

const Header: React.FC = () => {
  const t = useTranslations('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      setShowMenu(true)
    } else {
      // Aguarda a animação de saída antes de desmontar
      const timeout = setTimeout(() => setShowMenu(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [menuOpen])

  return (
    <nav className="flex items-center justify-between w-full lg:p-4">
      <Link href="/">
        <Logo />
      </Link>
      <div className="hidden md:flex items-center gap-4">
        <LocaleSwitcher />
        <Button asChild variant="ghost">
          <Link href="/sign-up">{t('register')}</Link>
        </Button>
        <Button asChild>
          <Link href="/app">{t('my-space')}</Link>
        </Button>
      </div>
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
            <Button asChild variant="ghost" className="w-full">
              <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                {t('register')}
              </Link>
            </Button>
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

export default Header
