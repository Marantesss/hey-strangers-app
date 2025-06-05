import Image from 'next/image'
import { Home, Media } from '@/payload-types'
import { Button } from '../ui/button'
import { Link } from '@/i18n/navigation'

interface CTASectionProps {
  cta: Home['cta']
}

export default function CTASection({ cta }: CTASectionProps) {
  return (
    <section className="md:container pb-20 md:pt-20">
      <div className="bg-[#E3FFCD] md:rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between gap-12">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-4 justify-center">
          <p className="text-sm">{cta.subtitle}</p>
          <h2 className="text-4xl font-bold text-center">{cta.title}</h2>
        </div>

        {/* Right Side - Quiz Card */}
        <div className="bg-white rounded-2xl p-8 md:w-[600px] overflow-hidden">
          {/* Progress Steps */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <span className="flex items-center gap-2">
              <span className="size-6 bg-secondary rounded-full text-white flex items-center justify-center">
                1
              </span>
              <span>Sport</span>
            </span>
            <span className="h-[2px] w-12 bg-gray-200 grow"></span>
            <span className="flex items-center gap-2">
              <span className="size-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                2
              </span>
              <span className="hidden md:block">Frequency</span>
            </span>
            <span className="h-[2px] w-12 bg-gray-200 grow"></span>
            <span className="flex items-center gap-2">
              <span className="size-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                3
              </span>
              <span className="hidden md:block">Competitiveness</span>
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-6">Choose your sport to get started</h3>

          {/* Sport Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {cta.sports.map((sport) => (
              <div
                key={sport.name}
                className={`relative md:aspect-square aspect-[4/1] rounded-2xl overflow-hidden cursor-pointer group ${
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
            <Link href="/sign-up">{cta.buttonLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
