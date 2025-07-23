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

export default async function ContactUsPage({ params }: Args) {
  const { locale = 'en' } = await params
  const { contactUs } = await getCachedPages(locale)
  return (
    <div className="prose mx-auto py-8">
      <h1>{contactUs?.title}</h1>
      <RichText data={contactUs?.content} />
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale = 'en' } = await params
  const { contactUs } = await getCachedPages(locale)
  return generateMetaForPage({ doc: contactUs })
}
