import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'

import NextGamesSection from '@/components/home/NextGamesSection'
import HeroSection from '@/components/home/HeroSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection from '@/components/home/CTASection'
import StrangersSection from '@/components/home/StrangersSection'
import WhenAndWhereSection from '@/components/home/WhenAndWhereSection'
import NumbersSection from '@/components/home/NumbersSection'
import FAQSection from '@/components/home/FAQSection'
import CTA2Section from '@/components/home/CTA2Section'
import Footer from '@/components/home/Footer'
import { generateMetaForPage } from '@/lib/metadata'
import { Metadata } from 'next'

// Option 1: Force dynamic rendering
// export const dynamic = 'force-dynamic'

// Option 2: Revalidate the page every X seconds (e.g., 60 seconds)
export const revalidate = 60

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function HomePage({ params }: Args) {
  const { locale = 'en' } = await params

  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home', locale })

  return (
    <main>
      <HeroSection hero={home.hero} />
      <NextGamesSection nextGames={home.nextGames} />
      <HowItWorksSection howItWorks={home.howItWorks} />
      <StatsSection stats={home.stats} />
      <TestimonialsSection testimonials={home.testimonials} />
      <CTASection cta={home.cta} />
      <StrangersSection strangers={home.strangers} />
      <WhenAndWhereSection whenAndWhere={home.whenAndWhere} />
      <NumbersSection numbers={home.numbers} />
      <FAQSection faq={home.faq} />
      <CTA2Section cta2={home.cta2} />
      <Footer locale={locale} />
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale = 'en' } = await params

  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home', locale })

  const metadata = await generateMetaForPage({ doc: home.seo ?? {} })

  return {
    ...metadata,
    alternates: {
      canonical: `/${locale}`,
    },
  }
}
