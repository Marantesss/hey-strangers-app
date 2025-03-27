import Image from 'next/image'
import { Home, Media } from '@/payload-types'

interface TestimonialsSectionProps {
  testimonials: Home['testimonials']
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="bg-[#F5F7F9] py-20">
      <div className="container space-y-20">
        <h2 className="text-5xl font-bold text-center">{testimonials.title}</h2>
        <div className="relative">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.reviews.map((testimonial) => (
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
        </div>
      </div>
    </section>
  )
}
