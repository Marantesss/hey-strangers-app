import { Home } from '@/payload-types'
import { Button } from '../ui/button'
import { Link } from '@/i18n/navigation'

interface CTA2SectionProps {
  cta2: Home['cta2']
}

export default function CTA2Section({ cta2 }: CTA2SectionProps) {
  return (
    <section className="bg-primary py-20">
      <div className="container gap-8 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-[#E3FFCD] text-center">{cta2.title}</h2>
        <Button
          asChild
          className="bg-[#E3FFCD] hover:bg-[#D1F7B0] border-0 text-primary font-semibold"
        >
          <Link href="/sign-up">{cta2.buttonLabel}</Link>
        </Button>
      </div>
    </section>
  )
}
