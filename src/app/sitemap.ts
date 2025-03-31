import type { MetadataRoute } from 'next'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${defaultUrl}/en`,
    },
    {
      url: `${defaultUrl}/en/sign-in`,
    },
    {
      url: `${defaultUrl}/pt`,
    },
    {
      url: `${defaultUrl}/pt/sign-in`,
    },
  ]
}
