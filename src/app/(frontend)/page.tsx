import Logo from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import WordCycle from '@/components/common/WordCycle'
import { getNextGame } from '@/domains/games/shared/GameService'
import Countdown from '@/components/common/Countdown'
import { Media } from '@/payload-types'

const FAKE_GAMES = [
  {
    id: 1,
    sport: '⚽ Soccer',
    image: '/games/soccer.jpg',
    description: '2 Teams of 6 + 2 Subs',
    location: 'Porto',
    startTime: new Date('2025-03-17T10:00:00Z'),
  },
  {
    id: 2,
    sport: '🎾 Padel',
    image: '/games/padel.jpg',
    description: '2 Teams of 2',
    location: 'Porto',
    startTime: new Date('2025-03-17T10:00:00Z'),
  },
  {
    id: 3,
    sport: '🏸 Tennis',
    image: '/games/tennis.jpg',
    description: '2 Teams of 2',
    location: 'Porto',
    startTime: new Date('2025-03-17T10:00:00Z'),
  },
  {
    id: 4,
    sport: '⛳ Golf',
    image: '/games/golf.jpg',
    description: '2 Teams of 2',
    location: 'Porto',
    startTime: new Date('2025-03-17T10:00:00Z'),
  },
]

export default async function Home() {
  const payload = await getPayload({ config })

  const home = await payload.findGlobal({ slug: 'home' })

  const nextGame = await getNextGame()

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#F5F7F9]">
        <div className="min-h-screen container py-8 flex flex-col items-center justify-between gap-8">
          <nav className="flex items-center justify-between w-full">
            <Logo />
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost">
                <Link href="/sign-up">Registo</Link>
              </Button>
              <Button asChild>
                <Link href="/app">O meu espaço</Link>
              </Button>
            </div>
          </nav>

          {/* Center Section */}
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold">
              {home.hero.title}
              <br />
              <span className="text-[#1BA781]">{home.hero.subtitle}</span>
            </h1>

            <p className="max-w-lg">{home.hero.description}</p>

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
                Next match in:
                <Countdown className="font-bold" date={nextGame.startsAt} />
              </p>
            )}

            <Button asChild>
              <Link href="/sign-up">{home.hero.buttonLabel}</Link>
            </Button>
          </div>

          {/* Partner Logos */}
          <div className="flex flex-wrap justify-between mt-4 w-full max-w-xl">
            {home.hero.partners.map((logo) => {
              const media = logo.logo as Media
              return (
                <Image key={logo.id} src={media.url!} alt={media.alt!} width={100} height={40} />
              )
            })}
          </div>
        </div>
      </section>

      {/* Next Games Section */}
      <section className="container space-y-20 py-20">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-bold">Your next game</h2>
          <div className="flex gap-2">
            <span className="px-4 py-2 rounded-lg font-semibold bg-[#E3FFCD] text-primary">
              All Games
            </span>
            <span className="px-4 py-2 rounded-lg font-semibold bg-[#F9F9FB] text-[#454745]">
              🎾 Padel
            </span>
            <span className="px-4 py-2 rounded-lg font-semibold bg-[#F9F9FB] text-[#454745]">
              🏸 Tennis
            </span>
            <span className="px-4 py-2 rounded-lg font-semibold bg-[#F9F9FB] text-[#454745]">
              ⛳ Golf
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FAKE_GAMES.map((game) => {
            const gameDay = game.startTime.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })
            const gameStartTime = game.startTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
            return (
              <div key={game.id} className="relative h-80 rounded-2xl overflow-hidden">
                <Image src={game.image} alt={game.sport} fill className="object-cover" />
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

      {/* How it Works Section */}
      <section className="container space-y-20 py-20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">{home.howItWorks.title}</h2>
          <p>{home.howItWorks.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {home.howItWorks.steps.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <Image src={(item.icon as Media).url!} alt={item.title} width={32} height={32} />
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/sign-up">{home.howItWorks.buttonLabel}</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold">{home.stats.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {home.stats.statistics.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 p-6 border rounded-2xl">
                  <p className="text-4xl font-bold text-[#1BA781]">{item.value}%</p>
                  <p className="">{item.label}</p>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden min-h-[300px]">
            <Image
              src={(home.stats.image as Media).url!}
              alt={(home.stats.image as Media).alt!}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Love Letters Section */}
      <section className="bg-[#F5F7F9] py-20">
        <div className="container space-y-20">
          <h2 className="text-5xl font-bold text-center">{home.testimonials.title}</h2>
          <div className="relative">
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {home.testimonials.reviews.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-primary text-white p-8 rounded-2xl flex flex-col justify-between gap-8"
                >
                  <p className="text-lg">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={(testimonial.image as Media).url!}
                      alt={testimonial.author}
                      width={32}
                      height={32}
                      className="rounded-full aspect-square object-cover"
                    />
                    <span className="font-semibold">{testimonial.author}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {/* <div className="flex justify-center gap-4 mt-8">
              <button
                className="w-12 h-12 rounded-full bg-[#F5F7F9] flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="w-12 h-12 rounded-full bg-[#003B3D] text-white flex items-center justify-center hover:bg-[#002728] transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="bg-[#E3FFCD] rounded-3xl p-12 flex flex-col md:flex-row justify-between gap-12">
          {/* Left Side */}
          <div className="flex flex-col gap-4 justify-center">
            <p className="text-sm">{home.cta.subtitle}</p>
            <h2 className="text-4xl font-bold">{home.cta.title}</h2>
          </div>

          {/* Right Side - Quiz Card */}
          <div className="bg-white rounded-2xl p-8 md:w-[600px]">
            {/* Progress Steps */}
            <div className="flex items-center gap-2 text-sm mb-8">
              <span className="flex items-center gap-2">
                <span className="size-6 bg-secondary rounded-full text-white flex items-center justify-center">
                  1
                </span>
                Sport
              </span>
              <span className="h-[2px] w-12 bg-gray-200 grow"></span>
              <span className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                  2
                </span>
                Frequency
              </span>
              <span className="h-[2px] w-12 bg-gray-200 grow"></span>
              <span className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                  3
                </span>
                Competitiveness
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-6">Choose your sport to get started</h3>

            {/* Sport Options Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {home.cta.sports.map((sport) => (
                <div
                  key={sport.name}
                  className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group ${
                    sport.selected ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <Image
                    src={(sport.image as Media).url!}
                    alt={(sport.image as Media).alt!}
                    fill
                    className="object-cover"
                  />
                  {sport.selected && (
                    <div className="absolute top-2 right-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#1BA781" />
                        <path
                          d="M8 12L11 15L16 9"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                    <span className="text-white font-semibold">{sport.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Start Button */}
            <Button asChild className="w-full" size="lg">
              <Link href="/sign-up">{home.cta.buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Strangers Section */}
      <section className="container space-y-12 py-20">
        <h2 className="text-4xl font-bold text-center">{home.strangers.title}</h2>

        <div className="flex justify-center gap-4">
          <div className="flex gap-2">
            <span className="px-4 py-2 rounded-lg font-semibold bg-[#E3FFCD] text-primary">
              All Sports
            </span>
            <span className="px-4 py-2 rounded-lg font-semibold bg-[#F9F9FB] text-[#454745]">
              🎾 Padel
            </span>
            <span className="px-4 py-2 rounded-lg font-semibold bg-[#F9F9FB] text-[#454745]">
              🏸 Tennis
            </span>
            <span className="px-4 py-2 rounded-lg font-semibold bg-[#F9F9FB] text-[#454745]">
              ⛳ Golf
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {home.strangers.strangers.map((stranger) => (
            <div key={stranger.name} className="p-6 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex gap-4">
                <div className="relative">
                  <Image
                    src={(stranger.image as Media).url!}
                    alt={(stranger.image as Media).alt!}
                    width={48}
                    height={48}
                    className="rounded-full object-cover aspect-square"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{stranger.name}</h3>
                  <span className="text-sm text-muted-foreground">{stranger.age}</span>
                </div>
              </div>

              <p className="text-muted-foreground">{stranger.bio}</p>
              <span className="text-sm font-medium text-primary">{stranger.sport}</span>
            </div>
          ))}
        </div>
      </section>

      {/* When & Where Section */}
      <section className="bg-[#F5F7F9] py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">{home.whenAndWhere.title}</h2>
            <p className="text-muted-foreground">{home.whenAndWhere.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side - Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src={(home.whenAndWhere.image as Media).url!}
                alt={(home.whenAndWhere.image as Media).alt!}
                fill
                className="object-cover"
              />
            </div>

            {/* Right Side - Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {home.whenAndWhere.features.map((feature) => (
                <div key={feature.title} className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#E3FFCD] flex items-center justify-center">
                    <span className="text-xl">{feature.emoji}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/sign-up">{home.whenAndWhere.buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="container space-y-20 py-20">
        <h2 className="text-4xl font-bold text-center">{home.numbers.title}</h2>

        <div className="grid grid-cols-2 md:grid-cols-8">
          {/* Cities */}
          <div className="bg-primary p-12 flex flex-col gap-6 justify-end text-white md:col-span-2 md:row-span-2">
            <p className="text-5xl font-bold">{home.numbers.numbers[0].value}</p>
            <p className="text-lg font-medium">{home.numbers.numbers[0].label}</p>
          </div>

          <div className="bg-[#F5F7F9] p-12 flex flex-col justify-between items-end md:col-span-3 rounded-bl-[16rem] aspect-square">
            <p className="text-5xl font-bold text-primary">{home.numbers.numbers[1].value}</p>
            <p className="text-lg text-primary">{home.numbers.numbers[1].label}</p>
          </div>

          <div className="bg-[#E3FFCD] p-12 flex flex-col justify-between items-end md:col-span-3 aspect-square rounded-l-[16rem]">
            <p className="text-5xl font-bold text-primary">{home.numbers.numbers[2].value}</p>
            <p className="text-lg text-primary">{home.numbers.numbers[2].label}</p>
          </div>

          <div className="bg-[#F5F7F9] p-12 flex flex-col justify-between items-start md:col-span-3 rounded-tr-[16rem] aspect-square">
            <p className="text-5xl font-bold text-primary">{home.numbers.numbers[3].value}</p>
            <p className="text-lg text-primary">{home.numbers.numbers[3].label}</p>
          </div>

          <div className="bg-primary p-12 flex flex-col justify-between items-start text-[#E3FFCD] md:col-span-3 aspect-square rounded-[4rem]">
            <p className="text-5xl font-bold">{home.numbers.numbers[4].value}</p>
            <p className="text-lg">{home.numbers.numbers[4].label}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container space-y-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-4xl font-bold">{home.faq.title}</h2>
          </div>

          <div className="md:col-span-2">
            <Accordion type="single" collapsible>
              {home.faq.questions.map((item) => (
                <AccordionItem
                  key={item.question}
                  value={item.question}
                  className="border border-[#EBEBEB]"
                >
                  <AccordionTrigger className="px-6 data-[state=open]:bg-[#F5F7F9] data-[state=open]:text-primary data-[state=open]:rounded-b-none">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#F5F7F9] px-6">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section 2 */}
      <section className="bg-primary py-20">
        <div className="container gap-8 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-[#E3FFCD]">{home.cta2.title}</h2>
          <Button
            asChild
            className="bg-[#E3FFCD] hover:bg-[#D1F7B0] border-0 text-primary font-semibold"
          >
            <Link href="/sign-up">{home.cta2.buttonLabel}</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0F12] text-white py-8">
        <div className="container flex md:flex-row md:justify-between flex-col gap-8">
          <ul className="flex flex-wrap gap-6 justify-center">
            {home.footer.links.map((link) => (
              <li key={link.label} className="text-center">
                <a href={link.url} className="hover:text-[#E3FFCD] transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 justify-center">
            <a href="#" className="hover:text-[#E3FFCD] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="hover:text-[#E3FFCD] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="#" className="hover:text-[#E3FFCD] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" className="hover:text-[#E3FFCD] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
