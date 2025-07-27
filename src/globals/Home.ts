import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      type: 'tabs',
      tabs: [
        // --- Hero Section
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'buttonLabel',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'partners',
              type: 'array',
              required: true,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        // --- Next Games Section
        {
          label: 'Next Games',
          name: 'nextGames',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'ctaLabel',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'games',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'emoji',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'sport',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'location',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'time',
                  type: 'date',
                  required: true,
                  admin: {
                    date: {
                      displayFormat: 'HH:mm',
                    },
                  },
                },
              ],
            },
          ],
        },
        // --- How It Works Section
        {
          label: 'How It Works',
          name: 'howItWorks',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'buttonLabel',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'steps',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        // --- Stats Section
        {
          label: 'Statistics',
          name: 'stats',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'statistics',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        // --- Testimonials Section
        {
          label: 'Testimonials',
          name: 'testimonials',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'reviews',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
                {
                  name: 'author',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        // --- CTA Section
        {
          label: 'CTA',
          name: 'cta',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'buttonLabel',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'sports',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'selected',
                  type: 'checkbox',
                  required: true,
                },
              ],
            },
          ],
        },
        // --- Strangers Section
        {
          label: 'Strangers',
          name: 'strangers',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'strangers',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'age',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'bio',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
                {
                  name: 'sport',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        // --- When & Where Section
        {
          label: 'When & Where',
          name: 'whenAndWhere',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'buttonLabel',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'features',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'emoji',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        // --- Numbers Section
        {
          label: 'Numbers',
          name: 'numbers',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'numbers',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        // --- FAQ Section
        {
          label: 'FAQ',
          name: 'faq',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'questions',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        // CTA 2
        {
          label: 'CTA 2',
          name: 'cta2',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'buttonLabel',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
        // SEO
        {
          label: 'SEO',
          name: 'seo',
          fields: [
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
