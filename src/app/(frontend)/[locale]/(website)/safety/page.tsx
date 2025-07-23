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

export default async function SafetyPage({ params }: Args) {
  const { locale = 'en' } = await params
  const { safety } = await getCachedPages(locale)

  return (
    <div className="prose mx-auto py-8">
      <h1>{safety?.title}</h1>
      <RichText data={safety?.content} />
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale = 'en' } = await params
  const { safety } = await getCachedPages(locale)

  return generateMetaForPage({ doc: safety })
}
