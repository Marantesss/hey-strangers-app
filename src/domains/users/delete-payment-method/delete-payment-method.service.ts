'use server'

import stripe from '@/lib/stripe'

export async function deletePaymentMethod(paymentMethodId: string) {
  try {
    await stripe.paymentMethods.detach(paymentMethodId)
  } catch (error) {
    console.error('Error deleting payment method:', error)
    throw new Error('Failed to delete payment method')
  }
}

// export async function updatePaymentMethod(
//   paymentMethodId: string,
//   card: {
//     exp_month: number
//     exp_year: number
//     billing_details: {
//       name: string
//       email?: string
//       phone?: string
//       address?: {
//         line1?: string
//         city?: string
//         state?: string
//         postal_code?: string
//         country?: string
//       }
//     }
//   },
// ) {
//   try {
//     const updatedPaymentMethod = await stripe.paymentMethods.update(paymentMethodId, {
//       card,
//     })
//     return updatedPaymentMethod
//   } catch (error) {
//     console.error('Error updating payment method:', error)
//     throw new Error('Failed to update payment method')
//   }
// }
