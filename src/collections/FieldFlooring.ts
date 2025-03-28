import { CollectionConfig } from 'payload'

export const FieldFlooring: CollectionConfig = {
  slug: 'fieldFloorings',
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
  ],
}
