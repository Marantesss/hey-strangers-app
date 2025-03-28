import { CollectionConfig } from 'payload'

export const FieldTypes: CollectionConfig = {
  slug: 'fieldTypes',
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
