import Image from 'next/image'
import { Home, Media } from '@/payload-types'
import { Button } from '../ui/button'
import Countdown from '../common/Countdown'
import { Link } from '@/i18n/navigation'
import Header from './Header'
import HeroSectionClient from './HeroSection.client'
import { Sport as PayloadSport } from '@payload-types'
import { GameModel } from '@/domains/games/shared/models/Game.model'
import { CityModel } from '@/domains/cities/shared/models/City.model'

interface HeroSectionProps {
  hero: Home['hero']
  sports: PayloadSport[]
  translations: any // Type from getTranslations
  nextGame: GameModel | null
  cities: CityModel[]
  defaultCity: CityModel | null
}

export default function HeroSection({
  hero,
  sports,
  translations,
  nextGame,
  cities,
  defaultCity,
}: HeroSectionProps) {
  return (
    <section className="bg-[#F5F7F9]">
      <div className="min-h-screen container max-md:px-6 py-6 lg:py-8 flex flex-col items-center justify-between gap-8">
        <Header />

        {/* Center Section */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            {hero.title}
            <br />
            <span className="text-[#1BA781]">{hero.subtitle}</span>
          </h1>

          <HeroSectionClient
            description={hero.description}
            sports={sports}
            cities={cities}
            defaultCity={defaultCity}
          />

          {nextGame && (
            <p className="max-w-lg">
              {translations('next-match-in')}:{' '}
              <Countdown className="font-bold" date={nextGame.startsAt} />
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
                unoptimized
                priority
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
