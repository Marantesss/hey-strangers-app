'use server'

import Stripe from 'stripe'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

const PaymentIntentSchema = z.object({
  amount: z.number().positive(),
})

interface CreatePaymentIntentResponse {
  clientSecret?: string | null
  error?: string
}

export async function createPaymentIntent(
  previousState: CreatePaymentIntentResponse,
  formData: FormData,
): Promise<CreatePaymentIntentResponse> {
  const amount = Number(formData.get('amount'))

  const result = PaymentIntentSchema.safeParse({
    amount,
  })

  if (!result.success) {
    return { error: 'Invalid payment data provided' }
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(result.data.amount * 100), // Convert to cents
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      // TODO Enable specific payment methods
      // payment_method_types: ['card', 'apple_pay', 'google_pay'],
    })

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return { error: 'Error creating payment intent' }
  }
}
