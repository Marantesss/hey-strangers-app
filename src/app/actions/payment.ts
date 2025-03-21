'use server'

import stripe from '@/lib/stripe'
import Stripe from 'stripe'

export async function createPaymentIntent(amount: number, currency: string = 'usd') {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      // Enable specific payment methods
      payment_method_types: ['card', 'apple_pay', 'google_pay'],
    })

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw new Error('Failed to create payment intent')
  }
}
