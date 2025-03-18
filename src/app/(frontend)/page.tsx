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
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#F5F7F9]">
        <div className="min-h-screen container py-8 flex flex-col items-center justify-between gap-8">
          {/* Hero Section */}
          <nav className="flex items-center justify-between w-full">
            <Logo />
            <div className="flex items-center gap-4">
              <Button variant="ghost">Registo</Button>
              <Button>O meu espaço</Button>
            </div>
          </nav>

          {/* Center Section */}
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hey strangers!
              <br />
              <span className="text-[#1BA781]">Let's play together.</span>
            </h1>

            <p className="max-w-lg">
              Play ceas with friendly strangers—matched to your skills and preferences by AI.
            </p>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>

            <p className="max-w-lg">
              Next match in: <span className="font-bold">1 day 9 hours 33 min 12 seconds</span>
            </p>

            <Button>Join the fun</Button>
          </div>

          {/* Partner Logos */}
          <div className="flex flex-wrap justify-between mt-4 w-full max-w-xl">
            <Image src="/partners/sic.png" alt="Partner 3" width={100} height={40} />
            <Image src="/partners/time-out.png" alt="Partner 4" width={100} height={40} />
            <Image src="/partners/nit.png" alt="Partner 2" width={100} height={40} />
            <Image src="/partners/business-insider.png" alt="Partner 1" width={100} height={40} />
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
          <h2 className="text-2xl font-bold">How the magic happens</h2>
          <p>Making social sports easy, fun, and friendly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: '/how-icons/quiz.png',
              title: 'Take our quick 3-minute skills tests',
              description:
                "Your skills help us find the right group for you. Don't worry—your data is 100% protected.",
            },
            {
              icon: '/how-icons/schedule.png',
              title: 'Choose your game and time',
              description:
                'Browse pre-planned games with set locations and times—just pick what works best for you.',
            },
            {
              icon: '/how-icons/show-up.png',
              title: 'Show up and say hey strangers',
              description:
                'We handle all the planning. Just show up, meet new friends, play your favorite sports, and enjoy the experience!',
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <Image src={item.icon} alt={item.title} width={32} height={32} />
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button>Choose your game</Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold">
              Facts facts about
              <br />
              Hey Strangers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  value: 95,
                  label: 'of players',
                  description: "say they were perfectly matched with their group's skill level.",
                },
                {
                  value: 82,
                  label: 'of participants',
                  description: 'would recommend Hey Stranger to their friends.',
                },
                {
                  value: 78,
                  label: 'of players',
                  description: 'have made lasting connections through our sports activities.',
                },
              ].map((item, index) => (
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
              src="/stats/running.jpg"
              alt="Players enjoying a game"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Love Letters Section */}
      <section className="bg-[#F5F7F9] py-20">
        <div className="container space-y-20">
          <h2 className="text-5xl font-bold text-center">Love letters</h2>
          <div className="relative">
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  quote:
                    "Joining Hey Stranger has been a game-changer! I was nervous about meeting new people, but the matching process was spot on. Now, I have a regular group for soccer, and it's the highlight of my week!",
                  author: 'Alex S.',
                  image: '/strangers/alex.jpg',
                },
                {
                  quote:
                    "I love how easy it is to find games that fit my schedule. The platform takes all the hassle out of organizing, and I've met some amazing paddle buddies along the way!",
                  author: 'Rita M.',
                  image: '/strangers/rita.jpg',
                },
                {
                  quote:
                    "As someone new to the city, Hey Stranger made it so easy to connect with people who share my love for tennis. It's like having a ready-made community waiting for you.",
                  author: 'Sara C.',
                  image: '/strangers/sara.jpg',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-primary text-white p-8 rounded-2xl flex flex-col justify-between gap-8"
                >
                  <p className="text-lg">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image}
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
            <div className="flex justify-center gap-4 mt-8">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="bg-[#E3FFCD] rounded-3xl p-12 flex flex-col md:flex-row justify-between gap-12">
          {/* Left Side */}
          <div className="flex flex-col gap-4 justify-center">
            <p className="text-sm">Take our skill test</p>
            <h2 className="text-4xl font-bold">Ready to start playing?</h2>
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
              {[
                { name: 'Soccer', image: '/games/soccer.jpg' },
                { name: 'Padel', image: '/games/padel.jpg', selected: true },
                { name: 'Tennis', image: '/games/tennis.jpg' },
                { name: 'Golf', image: '/games/golf.jpg' },
              ].map((sport) => (
                <div
                  key={sport.name}
                  className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group ${
                    sport.selected ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <Image src={sport.image} alt={sport.name} fill className="object-cover" />
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
            <Button className="w-full" size="lg">
              Start Now
            </Button>
          </div>
        </div>
      </section>

      {/* Meet Strangers Section */}
      <section className="container space-y-12 py-20">
        <h2 className="text-4xl font-bold text-center">Meet some of our strangers</h2>

        {/* Sport Filter */}
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

        {/* Strangers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Emma Carter',
              age: '25 years',
              bio: 'A passionate tennis player who loves both competition and casual matches. Always seeking partners to practice on sunny courts.',
              sport: 'Tennis',
              image: '/strangers/emma.jpg',
            },
            {
              name: 'Lucas Martins',
              age: '22 years',
              bio: 'A dedicated golf enthusiast known for his great spirit and sharp strokes. Enjoys connecting with other golf fans for pickup games.',
              sport: 'Golf',
              image: '/strangers/lucas.jpg',
            },
            {
              name: 'Jake Thompson',
              age: '19 years',
              bio: 'An aspiring young padel player who loves honing his skills and learning from teammates. Looks for new challenges.',
              sport: 'Padel',
              image: '/strangers/jake.jpg',
            },
            {
              name: 'Logan Brown',
              age: '29 years',
              bio: 'A padel player who balances work with her love for the sport. Always up for a competitive yet fun game on the weekends.',
              sport: 'Padel',
              image: '/strangers/logan.jpg',
            },
          ].map((stranger) => (
            <div key={stranger.name} className="p-6 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex gap-4">
                <div className="relative">
                  <Image
                    src={stranger.image}
                    alt={stranger.name}
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
            <h2 className="text-4xl font-bold">When & Where</h2>
            <p className="text-muted-foreground">Your perfect game, at the perfect time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side - Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/games/padel-2.jpg"
                alt="Player preparing for a game"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Side - Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#E3FFCD] flex items-center justify-center">
                  <span className="text-xl">🎾</span>
                </div>
                <h3 className="font-semibold text-lg">
                  Pre-scheduled games at convenient locations
                </h3>
                <p className="text-muted-foreground">
                  We plan everything for you! Games are hosted at top-rated venues, so you always
                  know exactly where to go.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#E3FFCD] flex items-center justify-center">
                  <span className="text-xl">⏰</span>
                </div>
                <h3 className="font-semibold text-lg">Choose the time that works for you</h3>
                <p className="text-muted-foreground">
                  Our schedule offers a variety of times to fit your day—whether it's a morning
                  tennis match or an evening soccer game, you'll find a slot that suits you.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#E3FFCD] flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <h3 className="font-semibold text-lg">Easy access to all locations</h3>
                <p className="text-muted-foreground">
                  Each game's location is easily accessible and shared in advance. Whether it's a
                  park, court, or sports facility, you'll get all the details upfront.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#E3FFCD] flex items-center justify-center">
                  <span className="text-xl">📅</span>
                </div>
                <h3 className="font-semibold text-lg">Flexible options for every schedule</h3>
                <p className="text-muted-foreground">
                  Can't make a match? No problem—just choose another time or day that works better
                  for you!
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="bg-[#E3FFCD] hover:bg-[#D1F7B0] border-0 text-primary font-semibold">
              Book your game now
            </Button>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="container space-y-20 py-20">
        <h2 className="text-4xl font-bold text-center">Hey Stranger in numbers</h2>

        <div className="grid grid-cols-2 md:grid-cols-8">
          {/* Cities */}
          <div className="bg-primary p-12 flex flex-col gap-6 justify-end text-white md:col-span-2 md:row-span-2">
            <p className="text-5xl font-bold">200</p>
            <p className="text-lg font-medium">cities</p>
          </div>

          <div className="bg-[#F5F7F9] p-12 flex flex-col justify-between items-end md:col-span-3 rounded-bl-[16rem] aspect-square">
            <p className="text-5xl font-bold text-primary">85</p>
            <p className="text-lg text-primary">countries</p>
          </div>

          <div className="bg-[#E3FFCD] p-12 flex flex-col justify-between items-end md:col-span-3 aspect-square rounded-l-[16rem]">
            <p className="text-5xl font-bold text-primary">120 000</p>
            <p className="text-lg text-primary">Strangers played together</p>
          </div>

          <div className="bg-[#F5F7F9] p-12 flex flex-col justify-between items-start md:col-span-3 rounded-tr-[16rem] aspect-square">
            <p className="text-5xl font-bold text-primary">1000</p>
            <p className="text-lg text-primary">scored points/goals</p>
          </div>

          <div className="bg-primary p-12 flex flex-col justify-between items-start text-[#E3FFCD] md:col-span-3 aspect-square rounded-[4rem]">
            <p className="text-5xl font-bold">14 000</p>
            <p className="text-lg">Games</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container space-y-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-4xl font-bold">Frequently asked questions</h2>
          </div>

          <div className="md:col-span-2">
            <Accordion type="single" collapsible>
              {[
                {
                  value: 'item-1',
                  question: 'How does the skill matching system work?',
                  answer:
                    'Our AI-powered matching system considers your experience level, playing style, and preferences to connect you with players of similar skill levels. This ensures balanced, enjoyable games for everyone involved.',
                },
                {
                  value: 'item-2',
                  question: 'What happens if I need to cancel a game?',
                  answer:
                    "You can cancel a game up to 24 hours before the scheduled time without any penalty. We'll notify other players and help find a replacement to ensure the game can still go ahead.",
                },
                {
                  value: 'item-3',
                  question: 'Are the venues and equipment provided?',
                  answer:
                    "All venues are pre-booked and included in the game fee. For equipment, it varies by sport and venue - we'll clearly indicate what's provided and what you need to bring in the game details.",
                },
                {
                  value: 'item-4',
                  question: 'How do I pay for games?',
                  answer:
                    'Payment is handled securely through our platform. You can pay per game or opt for a membership plan if you play regularly. We accept all major credit cards and digital payment methods.',
                },
                {
                  value: 'item-5',
                  question: 'Is there a minimum commitment required?',
                  answer:
                    "No minimum commitment! You can join games as frequently or infrequently as you like. Some players join weekly regular games, while others play occasionally - it's entirely up to you.",
                },
              ].map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
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

      <section className="bg-primary py-20">
        <div className="container gap-8 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-[#E3FFCD]">
            Hey Stranger, ready to take a chance?
          </h2>
          <Button className="bg-[#E3FFCD] hover:bg-[#D1F7B0] border-0 text-primary font-semibold">
            Choose your game
          </Button>
        </div>
      </section>

      <footer className="bg-[#0B0F12] text-white py-8">
        <div className="container flex md:flex-row md:justify-between flex-col gap-8">
          <ul className="flex flex-wrap gap-6 justify-center">
            <li className="text-center">
              <a href="#" className="hover:text-[#E3FFCD] transition-colors">
                Contact Us
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-[#E3FFCD] transition-colors">
                Safety Tips & Rules
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-[#E3FFCD] transition-colors">
                Community Guidelines
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-[#E3FFCD] transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-[#E3FFCD] transition-colors">
                Privacy Policy
              </a>
            </li>
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
