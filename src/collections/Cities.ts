import { hasRole } from '@/access'
import { CollectionConfig } from 'payload'

export const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    update: hasRole('admins'),
    delete: hasRole('admins'),
    create: hasRole('admins'),
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
