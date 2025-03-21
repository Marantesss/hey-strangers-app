import { hasRole } from '@/access'
import type { CollectionConfig } from 'payload'

export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: hasRole('admins'),
    create: hasRole('admins'),
    update: hasRole('admins'),
    delete: hasRole('admins'),
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
