import { defineRouting } from 'next-intl/routing'
import localization from './localizations'

export const routing = defineRouting({
  locales: localization.locales.map((locale) => locale.code),
  defaultLocale: localization.defaultLocale,
})
