import Image from 'next/image'
import { Home, Media } from '@/payload-types'

interface TestimonialsSectionProps {
  testimonials: Home['testimonials']
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="bg-[#F5F7F9] py-20">
      <div className="space-y-20">
        <div className="container">
          <h2 className="text-5xl font-bold text-center">{testimonials.title}</h2>
        </div>
        <div className="flex justify-center">
          <div className="flex overflow-x-auto gap-8 px-4 snap-x no-scrollbar">
            {testimonials.reviews.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative w-[calc(100vw-2rem)] md:w-96 flex-none snap-center bg-primary text-white p-8 rounded-2xl flex flex-col justify-between gap-8"
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
      </div>
    </section>
  )
}
