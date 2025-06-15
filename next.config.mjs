import { withPayload } from '@payloadcms/next/withPayload'

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_URL: `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL}`,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
