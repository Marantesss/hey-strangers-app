import type { GlobalConfig } from 'payload'
import {
  OverviewField,
  MetaTitleField,
  MetaImageField,
  MetaDescriptionField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: GlobalConfig = {
  slug: 'pages',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Us',
          name: 'contactUs',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
            },
            OverviewField({}),
            MetaTitleField({}),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({}),
          ],
        },
        {
          label: 'Safety',
          name: 'safety',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
            },
            OverviewField({}),
            MetaTitleField({}),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({}),
          ],
        },
        {
          label: 'Community Guidelines',
          name: 'communityGuidelines',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
            },
            OverviewField({}),
            MetaTitleField({}),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({}),
          ],
        },
        {
          label: 'Terms of Service',
          name: 'termsOfService',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
            },
            OverviewField({}),
            MetaTitleField({}),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({}),
          ],
        },
        {
          label: 'Privacy Policy',
          name: 'privacyPolicy',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
            },
            OverviewField({}),
            MetaTitleField({}),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({}),
          ],
        },
      ],
    },
  ],
}
