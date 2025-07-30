'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Home, Media } from '@/payload-types'
import { useTranslations } from 'next-intl'

interface StrangersSectionProps {
  strangers: Home['strangers']
}

export default function StrangersSection({ strangers }: StrangersSectionProps) {
  const t = useTranslations('home')
  const [selectedSport, setSelectedSport] = useState('All Sports')

  const sportFilters = [
    'All Sports',
    ...Array.from(new Set(strangers.strangers.map((stranger) => stranger.sport))),
  ]

  const filteredStrangers =
    selectedSport === 'All Sports'
      ? strangers.strangers
      : strangers.strangers.filter((stranger) => stranger.sport === selectedSport)

  return (
    <section className="container space-y-12 py-12 md:py-20">
      <h2 className="text-4xl font-bold text-center">{strangers.title}</h2>

      <div className="flex justify-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {sportFilters.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedSport === sport
                  ? 'bg-[#E3FFCD] text-primary'
                  : 'bg-[#F9F9FB] text-[#454745] hover:bg-[#F0F0F2]'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStrangers.map((stranger) => (
          <div key={stranger.name} className="p-6 rounded-2xl border border-gray-200 space-y-4">
            <div className="flex gap-4">
              <div className="relative">
                <Image
                  src={(stranger.image as Media).url!}
                  alt={(stranger.image as Media).alt!}
                  width={48}
                  height={48}
                  className="rounded-full object-cover aspect-square"
                  unoptimized
                  priority={false}
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{stranger.name}</h3>
                <span className="text-sm text-muted-foreground">
                  {t('years-old', { count: stranger.age })}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground">{stranger.bio}</p>
            <p className="text-sm font-medium text-primary">{stranger.sport}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
