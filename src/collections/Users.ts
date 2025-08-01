import { hasRole, isAuthenticated } from '@/access'
import getPaymentMethodsEndpoint from '@/domains/users/get-payment-methods/get-payment-methods.endpoint'
import {
  createStripeCustomer,
  deleteStripeCustomer,
  updateStripeCustomer,
} from '@/domains/users/sync-stripe-customer/sync-stripe-customer.hooks'
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    disableLocalStrategy: true,
    // Configurações explícitas de cookies para resolver problemas de autenticação
    cookies: {
      secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
      sameSite: 'Lax', // Permite cookies cross-origin necessários
      domain: undefined, // Usar domínio atual (não definir domínio específico)
    },
    // Tempo de expiração do token (padrão: 1 semana)
    tokenExpiration: 604800, // 7 dias em segundos
  },
  access: {
    read: isAuthenticated(),
    create: isAuthenticated(),
    update: hasRole('admins'),
    delete: hasRole('admins'),
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    // --- FIELDS
    {
      name: 'email',
      type: 'email',
      required: false,
      unique: true,
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      required: false,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'otp',
      type: 'group',
      fields: [
        {
          name: 'code',
          type: 'text',
        },
        {
          name: 'expiration',
          type: 'date',
        },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeChange: [
          // remove whitespaces
          ({ value }) => value.replace(/\s/g, ''),
        ],
      },
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      required: false,
    },
    {
      name: 'quizAnswers',
      type: 'json',
      required: true,
      access: {
        read: hasRole('admins'),
        update: hasRole('admins'),
      },
      admin: {
        readOnly: true,
      },
    },
    // --- relations and joins
    {
      name: 'registrations',
      type: 'join',
      collection: 'registrations',
      on: 'user',
    },
    {
      name: 'invites',
      type: 'join',
      collection: 'invites',
      on: 'user',
    },
  ],
  endpoints: [getPaymentMethodsEndpoint],
  hooks: {
    afterChange: [createStripeCustomer, updateStripeCustomer],
    afterDelete: [deleteStripeCustomer],
  },
}
