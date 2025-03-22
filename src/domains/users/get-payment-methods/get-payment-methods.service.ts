import stripe from '@/lib/stripe'
import { getUserById } from '../get-user/get-user.service'

export async function getPaymentMethods(userId: string) {
  const user = await getUserById(userId)

  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId!,
      type: 'card',
    })
    return paymentMethods.data
  } catch (error) {
    console.error('Error fetching payment methods:', error)
    throw new Error('Failed to fetch payment methods')
  }
}
