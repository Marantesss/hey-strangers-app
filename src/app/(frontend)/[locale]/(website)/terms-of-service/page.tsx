import { generateMetaForPage } from '@/lib/metadata'
import { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getCachedPages } from '@/domains/pages/get-pages-data.service'
import { TypedLocale } from 'payload'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export const revalidate = 60

export default async function TermsOfServicePage({ params }: Args) {
  const { locale = 'en' } = await params
  const { termsOfService } = await getCachedPages(locale)

  return (
    <div className="prose mx-auto py-8">
      <h1>{termsOfService?.title}</h1>
      <RichText data={termsOfService?.content} />
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale = 'en' } = await params
  const { termsOfService } = await getCachedPages(locale)

  return generateMetaForPage({ doc: termsOfService })
}
