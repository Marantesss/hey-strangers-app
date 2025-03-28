import type { GlobalConfig } from 'payload'

export const Pages: GlobalConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'contactUs',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'safety',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'communityGuidelines',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'termsOfService',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'privacyPolicy',
      type: 'richText',
      required: true,
      localized: true,
    },
  ],
}
