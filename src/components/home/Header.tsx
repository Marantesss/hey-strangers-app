import { Link } from '@/i18n/navigation'
import LocaleSwitcher from '../common/LocaleSwitcher'
import Logo from '../common/Logo'
import { Button } from '../ui/button'
import { getTranslations } from 'next-intl/server'

const Header: React.FC = async () => {
  const t = await getTranslations('home')

  return (
    <nav className="flex items-center justify-between w-full">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <Button asChild variant="ghost">
          <Link href="/sign-up">{t('register')}</Link>
        </Button>
        <Button asChild>
          <Link href="/app">{t('my-space')}</Link>
        </Button>
      </div>
    </nav>
  )
}

export default Header
