import { CollectionConfig } from 'payload'

export const FieldAmenities: CollectionConfig = {
  slug: 'fieldAmenities',
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
