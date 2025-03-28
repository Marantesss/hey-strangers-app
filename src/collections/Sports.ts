import { CollectionConfig } from 'payload'

export const Sports: CollectionConfig = {
  slug: 'sports',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'emoji',
      type: 'text',
      required: true,
    },
  ],
}
