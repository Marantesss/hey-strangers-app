import Image from 'next/image'
import { Home, Media } from '@/payload-types'
import { Button } from '../ui/button'
import { Link } from '@/i18n/navigation'

interface HowItWorksSectionProps {
  howItWorks: Home['howItWorks']
}

export default async function HowItWorksSection({ howItWorks }: HowItWorksSectionProps) {
  return (
    <section className="container space-y-20 py-20">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">{howItWorks.title}</h2>
        <p className="text-muted-foreground">{howItWorks.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {howItWorks.steps.map((item, index) => (
          <div key={index} className="flex flex-col items-center md:items-start gap-4">
            <Image src={(item.icon as Media).url!} alt={item.title} width={32} height={32} />
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild className="bg-[#E3FFCD] text-primary hover:text-white">
          <Link href="/sign-up">{howItWorks.buttonLabel}</Link>
        </Button>
      </div>
    </section>
  )
}
