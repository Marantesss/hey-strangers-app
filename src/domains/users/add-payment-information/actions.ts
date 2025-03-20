'use server'

import { z } from 'zod'
import Stripe from 'stripe'
import { getCurrentUser } from '../shared/UserService'
import { revalidatePath } from 'next/cache'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

const CreatePaymentMethodSchema = z.object({
  userId: z.string(),
  name: z.string(),
  cardToken: z.string(),
  country: z.string(),
  postalCode: z.string(),
})

export type CreatePaymentMethodActionState = {
  success?: boolean
  error?: string
}

export async function createPaymentMethodAction(
  previousState: CreatePaymentMethodActionState,
  formData: FormData,
): Promise<CreatePaymentMethodActionState> {
  try {
    const validatedFields = CreatePaymentMethodSchema.safeParse({
      userId: formData.get('userId'),
      name: formData.get('name'),
      cardToken: formData.get('cardToken'),
      country: formData.get('country'),
      postalCode: formData.get('postalCode'),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data',
      }
    }

    const user = await getCurrentUser()
    if (!user?.stripeCustomerId) {
      return {
        success: false,
        error: 'User not found or no Stripe customer ID',
      }
    }

    // Create payment method using the card token
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: { token: validatedFields.data.cardToken },
      billing_details: {
        name: validatedFields.data.name,
        address: {
          country: validatedFields.data.country,
          postal_code: validatedFields.data.postalCode,
        },
      },
    })

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: user.stripeCustomerId,
    })

    // Set as default payment method
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    })

    revalidatePath('/')

    return { success: true }
  } catch (error: any) {
    console.error('Error creating payment method:', error)
    return {
      success: false,
      error: error.message || 'Failed to create payment method',
    }
  }
}

// Delete payment method
