'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Home, Media } from '@/payload-types'

interface NextGamesSectionProps {
  nextGames: Home['nextGames']
}

export default function NextGamesSection({ nextGames }: NextGamesSectionProps) {
  const [selectedSport, setSelectedSport] = useState('All Games')

  const sportFilters = [
    'All Games',
    ...Array.from(new Set(nextGames.games.map((game) => `${game.emoji} ${game.sport}`))),
  ]

  const filteredGames =
    selectedSport === 'All Games'
      ? nextGames.games
      : nextGames.games.filter((game) => game.sport === selectedSport.split(' ')[1])

  return (
    <section className="container space-y-20 py-20">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold">{nextGames.title}</h2>
        <div className="flex gap-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredGames.map((game) => {
          const timeDate = new Date(game.time)
          const gameDay = timeDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })
          const gameStartTime = timeDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })
          const media = game.image as Media
          return (
            <div key={game.id} className="relative h-80 rounded-2xl overflow-hidden">
              <Image src={media.url!} alt={media.alt!} fill className="object-cover" />
              <div className="absolute text-sm inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end gap-2 text-white">
                <h3>{game.sport}</h3>
                <p className="font-bold">
                  {gameDay} • {gameStartTime}
                </p>
                <p className="font-bold">📍 {game.location}</p>
                <p>{game.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
