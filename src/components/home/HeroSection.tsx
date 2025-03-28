import Image from 'next/image'
import { Home, Media } from '@/payload-types'
import Logo from '../common/Logo'
import { Button } from '../ui/button'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select'
import { getNextGame } from '@/domains/games/shared/GameService'
import Countdown from '../common/Countdown'
import LocaleSwitcher from '../common/LocaleSwitcher'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Header from './Header'

interface HeroSectionProps {
  hero: Home['hero']
}

export default async function HeroSection({ hero }: HeroSectionProps) {
  const t = await getTranslations('home')
  const nextGame = await getNextGame()

  return (
    <section className="bg-[#F5F7F9]">
      <div className="min-h-screen container py-8 flex flex-col items-center justify-between gap-8">
        <Header />

        {/* Center Section */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            {hero.title}
            <br />
            <span className="text-[#1BA781]">{hero.subtitle}</span>
          </h1>

          <p className="max-w-lg">{hero.description}</p>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="porto">Porto</SelectItem>
              <SelectItem value="lisboa">Lisboa</SelectItem>
            </SelectContent>
          </Select>

          {nextGame && (
            <p className="max-w-lg">
              {t('next-match-in')} <Countdown className="font-bold" date={nextGame.startsAt} />
            </p>
          )}

          <Button asChild>
            <Link href="/sign-up">{hero.buttonLabel}</Link>
          </Button>
        </div>

        {/* Partner Logos */}
        <div className="flex justify-between mt-4 w-full max-w-xl">
          {hero.partners.map((logo) => {
            const media = logo.logo as Media
            return (
              <Image
                key={logo.id}
                src={media.url!}
                alt={media.alt!}
                width={100}
                height={32}
                className="w-16 md:w-[100px]"
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
