import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'

import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Metadata } from 'next'
import { generateMetaForPage } from '@/lib/metadata'

// Option 1: Force dynamic rendering
// export const dynamic = 'force-dynamic'

// Option 2: Revalidate the page every X seconds (e.g., 60 seconds)
export const revalidate = 60

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function CommunityGuidelinesPage({ params }: Args) {
  console.log('[DEBUG] Início CommunityGuidelinesPage')
  const { locale = 'en' } = await params
  console.log('[DEBUG] Locale obtido:', locale)
  const payload = await getPayload({ config })
  console.log('[DEBUG] Payload obtido')
  const { communityGuidelines } = await payload.findGlobal({ slug: 'pages', locale })
  console.log('[DEBUG] Dados communityGuidelines obtidos:', !!communityGuidelines)

  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      <div className="container py-8 space-y-8">
        <Header />
        <div className="prose lg:prose-xl">
          <RichText data={communityGuidelines.content} />
        </div>
      </div>
      <Footer locale={locale} />
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  console.log('[DEBUG] Início generateMetadata CommunityGuidelinesPage')
  const { locale = 'en' } = await params
  console.log('[DEBUG] Locale obtido:', locale)
  const payload = await getPayload({ config })
  console.log('[DEBUG] Payload obtido')
  const { communityGuidelines } = await payload.findGlobal({ slug: 'pages', locale })
  console.log('[DEBUG] Dados communityGuidelines obtidos:', !!communityGuidelines)

  return generateMetaForPage({ doc: communityGuidelines })
}
