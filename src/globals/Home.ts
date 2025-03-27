import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    // --- Hero Section
    {
      name: 'hero',
      type: 'group',
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
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
    // --- Next Games Section
    {
      name: 'nextGames',
      type: 'group',
      fields: [
        {
          name: 'title',
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
      name: 'howItWorks',
      type: 'group',
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
      name: 'stats',
      type: 'group',
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
      name: 'testimonials',
      type: 'group',
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
      name: 'cta',
      type: 'group',
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
      name: 'strangers',
      type: 'group',
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
      name: 'whenAndWhere',
      type: 'group',
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
      name: 'numbers',
      type: 'group',
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
      name: 'faq',
      type: 'group',
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
      name: 'cta2',
      type: 'group',
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
  ],
}
