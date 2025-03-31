import stripe from '@/lib/stripe'
import { User } from '@payload-types'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const createStripeCustomer: CollectionAfterChangeHook<User> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'update') return

  const customer = await stripe.customers.create({
    ...(doc.email && { email: doc.email }),
    ...(doc.name && { name: doc.name }),
    ...(doc.phoneNumber && { phone: doc.phoneNumber }),
    metadata: {
      userId: doc.id,
    },
  })

  await req.payload.update({
    req,
    collection: 'users',
    id: doc.id,
    data: {
      stripeCustomerId: customer.id,
    },
  })
}

export const updateStripeCustomer: CollectionAfterChangeHook<User> = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (operation === 'create') return

  if (!doc.stripeCustomerId) {
    req.payload.logger.warn('No stripe customer id found for user', { id: doc.id })

    const customer = await stripe.customers.create({
      ...(doc.email && { email: doc.email }),
      ...(doc.name && { name: doc.name }),
      ...(doc.phoneNumber && { phone: doc.phoneNumber }),
      metadata: {
        userId: doc.id,
      },
    })

    await req.payload.update({
      req,
      collection: 'users',
      id: doc.id,
      data: { stripeCustomerId: customer.id },
    })

    return
  }

  // check if email, phone, name or city has changed
  const hasChanged =
    doc.email !== previousDoc.email ||
    doc.name !== previousDoc.name ||
    doc.phoneNumber !== previousDoc.phoneNumber ||
    doc.city !== previousDoc.city

  if (!hasChanged) return

  await stripe.customers.update(doc.stripeCustomerId!, {
    ...(doc.email && { email: doc.email }),
    ...(doc.name && { name: doc.name }),
    ...(doc.phoneNumber && { phone: doc.phoneNumber }),
  })
}

export const deleteStripeCustomer: CollectionAfterDeleteHook<User> = async ({ doc }) => {
  if (!doc.stripeCustomerId) return
  const c = await stripe.customers.del(doc.stripeCustomerId)
}
