'use client'
import Image from 'next/image'
import { Home, Media } from '@/payload-types'
import { useRef, useState, useEffect } from 'react'

interface TestimonialsSectionProps {
  testimonials: Home['testimonials']
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [showArrows, setShowArrows] = useState(false)

  const checkScroll = () => {
    const el = carouselRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)

    const card = el.querySelector('div[role="testimonial-card"]') as HTMLDivElement | null
    if (card) {
      const cardWidth = card.offsetWidth + 32
      const cardsVisiveis = Math.floor(el.clientWidth / cardWidth)
      setShowArrows(testimonials.reviews.length > cardsVisiveis)
    } else {
      setShowArrows(false)
    }
  }

  useEffect(() => {
    checkScroll()
    const handleResize = () => checkScroll()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleScroll = () => {
    checkScroll()
  }

  const scrollLeft = () => {
    const el = carouselRef.current
    if (!el) return
    el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' })
  }

  const scrollRight = () => {
    const el = carouselRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="bg-[#F5F7F9] py-20">
      <div className="space-y-6">
        <div className="container">
          <h2 className="text-5xl font-bold text-center">{testimonials.title}</h2>
        </div>
        <div className="flex justify-center">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-8 px-4 snap-x no-scrollbar w-full max-w-[1200px]"
          >
            {testimonials.reviews.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative w-[calc(100vw-2rem)] md:w-[360px] lg:w-[360px] flex-none snap-center bg-primary text-white p-8 rounded-2xl flex flex-col justify-between gap-8"
                role="testimonial-card"
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
        </div>
        {showArrows && (
          <div className="flex justify-center gap-6">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Anterior"
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-colors ${canScrollLeft ? 'bg-primary' : 'bg-[#ECEFF1]'} `}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 30L15 20L25 10"
                  stroke={canScrollLeft ? '#E9FFD7' : '#90A4AE'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Próximo"
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-colors ${canScrollRight ? 'bg-primary' : 'bg-[#ECEFF1]'} `}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 10L25 20L15 30"
                  stroke={canScrollRight ? '#E9FFD7' : '#90A4AE'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
