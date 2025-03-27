import Image from 'next/image'
import { Home, Media } from '@/payload-types'
import { Button } from '../ui/button'
import { Link } from '@/i18n/navigation'

interface WhenAndWhereSectionProps {
  whenAndWhere: Home['whenAndWhere']
}

export default function WhenAndWhereSection({ whenAndWhere }: WhenAndWhereSectionProps) {
  return (
    <section className="bg-[#F5F7F9] py-20">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">{whenAndWhere.title}</h2>
          <p className="text-muted-foreground">{whenAndWhere.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side - Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src={(whenAndWhere.image as Media).url!}
              alt={(whenAndWhere.image as Media).alt!}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side - Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whenAndWhere.features.map((feature) => (
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
            <Link href="/sign-up">{whenAndWhere.buttonLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
