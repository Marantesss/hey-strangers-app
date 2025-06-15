import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'

import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import { RichText } from '@payloadcms/richtext-lexical/react'
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

export default async function SafetyPage({ params }: Args) {
  console.log('[DEBUG] Início SafetyPage')
  const { locale = 'en' } = await params
  console.log('[DEBUG] Locale obtido:', locale)
  const payload = await getPayload({ config })
  console.log('[DEBUG] Payload obtido')
  const { safety } = await payload.findGlobal({ slug: 'pages', locale })
  console.log('[DEBUG] Dados safety obtidos:', !!safety)

  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      <div className="container py-8 space-y-8">
        <Header />
        <div className="prose lg:prose-xl">
          <RichText data={safety.content} />
        </div>
      </div>
      <Footer locale={locale} />
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  console.log('[DEBUG] Início generateMetadata SafetyPage')
  const { locale = 'en' } = await params
  console.log('[DEBUG] Locale obtido:', locale)
  const payload = await getPayload({ config })
  console.log('[DEBUG] Payload obtido')
  const { safety } = await payload.findGlobal({ slug: 'pages', locale })
  console.log('[DEBUG] Dados safety obtidos:', !!safety)

  return generateMetaForPage({ doc: safety })
}
