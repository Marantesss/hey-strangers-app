import stripe from '@/lib/stripe'
import { Game } from '@payload-types'
import { CollectionAfterDeleteHook, CollectionBeforeChangeHook } from 'payload'

/**
 * @deprecated This is not used anymore as we are just charging a the price + fee without any Stripe product
 */
export const createStripeProduct: CollectionBeforeChangeHook<Game> = async ({
  data,
  operation,
}) => {
  // // Only create Stripe product on create operation
  // if (operation !== 'create') return data
  // const fieldId = data.field instanceof Object ? data.field.id : data.field!
  // const sportId = data.sport instanceof Object ? data.sport.id : data.sport!
  // // Create the Stripe product
  // const product = await stripe.products.create({
  //   name: data.name!,
  //   description: data.description ?? '',
  //   default_price_data: {
  //     currency: 'eur',
  //     unit_amount: data.price! * 100, // Convert to cents
  //   },
  //   metadata: {
  //     id: data.id!,
  //     sportId,
  //     fieldId,
  //     startsAt: data.startsAt!,
  //     endsAt: data.endsAt!,
  //     maxPlayers: data.maxPlayers!.toString(),
  //   },
  // })
  // // Add the Stripe product ID to the game data
  // return {
  //   ...data,
  //   stripeProductId: product.id,
  // }
}

/**
 * @deprecated This is not used anymore as we are just charging a the price + fee without any Stripe product
 */
export const updateStripeProduct: CollectionBeforeChangeHook<Game> = async ({
  data,
  operation,
  originalDoc,
}) => {
  // if (operation !== 'update') return data
  // const fieldId = data.field instanceof Object ? data.field.id : data.field!
  // const sportId = data.sport instanceof Object ? data.sport.id : data.sport!
  // const didPriceChange = originalDoc?.price !== data.price
  // if (didPriceChange) {
  //   const stripeProduct = await stripe.products.retrieve(data.stripeProductId!)
  //   await stripe.prices.create({
  //     product: stripeProduct.id,
  //     currency: 'eur',
  //     unit_amount: data.price! * 100, // Convert to cents
  //   })
  // }
  // const product = await stripe.products.update(data.stripeProductId!, {
  //   name: data.name!,
  //   description: data.description ?? '',
  //   metadata: {
  //     id: data.id!,
  //     sportId,
  //     fieldId,
  //     startsAt: data.startsAt!,
  //     endsAt: data.endsAt!,
  //     maxPlayers: data.maxPlayers!.toString(),
  //   },
  // })
  // return {
  //   ...data,
  //   stripeProductId: product.id,
  // }
}

/**
 * @deprecated This is not used anymore as we are just charging a the price + fee without any Stripe product
 */
export const deleteStripeProduct: CollectionAfterDeleteHook<Game> = async ({ doc }) => {
  // if (!doc.stripeProductId) return
  // // Archive all prices associated with the product first
  // const prices = await stripe.prices.list({
  //   product: doc.stripeProductId,
  //   active: true,
  // })
  // for (const price of prices.data) {
  //   await stripe.prices.update(price.id, { active: false })
  // }
  // // Then delete the product itself
  // await stripe.products.del(doc.stripeProductId)
}
