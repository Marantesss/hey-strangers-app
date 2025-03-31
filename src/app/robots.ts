import type { MetadataRoute } from 'next'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '*sign-up',
    },
    sitemap: `${defaultUrl}/sitemap.xml`,
  }
}
