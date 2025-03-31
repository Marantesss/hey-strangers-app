import type { Metadata } from 'next'

import type { Media } from '../payload-types'

type AllPageTypes = {
  title?: string | null
  image?: (string | null) | Media
  description?: string | null
}

export const generateMetaForPage = async (args: { doc: AllPageTypes }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.image === 'object' &&
    doc.image !== null &&
    'url' in doc.image &&
    `${process.env.NEXT_PUBLIC_APP_URL}${doc.image.url}`

  const title = doc?.title ? doc?.title + ' | Hey Strangers' : 'Hey Strangers'

  return {
    description: doc?.description,
    openGraph: mergeOpenGraph({
      description: doc?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: '/',
    }),
    title,
  }
}

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Hey Strangers is a platform for finding and joining sports groups.',
  images: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/default-og.png`
        : '/default-og.png',
    },
  ],
  siteName: 'Hey Strangers',
  title: 'Hey Strangers',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
