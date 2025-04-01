import './globals.css'

import { DM_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

import { NextIntlClientProvider } from 'next-intl'
import { TypedLocale } from 'payload'
import { Metadata } from 'next'

const dmSans = DM_Sans({
  display: 'swap',
  subsets: ['latin'],
})

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: TypedLocale }>
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={dmSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Hey Strangers',
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      pt: '/pt',
      'x-default': '/en',
    },
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
