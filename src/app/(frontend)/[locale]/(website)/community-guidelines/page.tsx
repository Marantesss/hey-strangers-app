import { generateMetaForPage } from '@/lib/metadata'
import { Metadata } from 'next'
import { getCachedPages } from '@/domains/pages/get-pages-data.service'
import { TypedLocale } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export const revalidate = 60

export default async function CommunityGuidelinesPage({ params }: Args) {
  const { locale = 'en' } = await params
  const { communityGuidelines } = await getCachedPages(locale)

  return (
    <div className="prose mx-auto py-8">
      <h1>{communityGuidelines?.title}</h1>
      <RichText data={communityGuidelines?.content} />
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale = 'en' } = await params
  const { communityGuidelines } = await getCachedPages(locale)

  return generateMetaForPage({ doc: communityGuidelines })
}
