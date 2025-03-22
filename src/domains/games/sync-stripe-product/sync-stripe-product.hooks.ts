import stripe from '@/lib/stripe'
import { Game } from '@payload-types'
import { CollectionAfterDeleteHook, CollectionBeforeChangeHook } from 'payload'

export const createStripeProduct: CollectionBeforeChangeHook<Game> = async ({
  data,
  operation,
}) => {
  // Only create Stripe product on create operation
  if (operation !== 'create') return data

  const fieldId = data.field instanceof Object ? data.field.id : data.field!

  // Create the Stripe product
  const product = await stripe.products.create({
    name: data.name!,
    description: data.description ?? '',
    default_price_data: {
      currency: 'eur',
      unit_amount: data.price! * 100, // Convert to cents
    },
    metadata: {
      id: data.id!,
      sport: data.sport!,
      fieldId,
      startsAt: data.startsAt!,
      endsAt: data.endsAt!,
      maxPlayers: data.maxPlayers!.toString(),
    },
  })

  // Add the Stripe product ID to the game data
  return {
    ...data,
    stripeProductId: product.id,
  }
}

export const updateStripeProduct: CollectionBeforeChangeHook<Game> = async ({
  data,
  operation,
  originalDoc,
}) => {
  if (operation !== 'update') return data

  const fieldId = data.field instanceof Object ? data.field.id : data.field!

  const didPriceChange = originalDoc?.price !== data.price

  if (didPriceChange) {
    const stripeProduct = await stripe.products.retrieve(data.stripeProductId!)
    await stripe.prices.create({
      product: stripeProduct.id,
      currency: 'eur',
      unit_amount: data.price! * 100, // Convert to cents
    })
  }

  const product = await stripe.products.update(data.stripeProductId!, {
    name: data.name!,
    description: data.description ?? '',
    metadata: {
      id: data.id!,
      sport: data.sport!,
      fieldId,
      startsAt: data.startsAt!,
      endsAt: data.endsAt!,
      maxPlayers: data.maxPlayers!.toString(),
    },
  })

  return {
    ...data,
    stripeProductId: product.id,
  }
}

export const deleteStripeProduct: CollectionAfterDeleteHook<Game> = async ({ doc }) => {
  if (!doc.stripeProductId) return
  await stripe.products.del(doc.stripeProductId)
}
