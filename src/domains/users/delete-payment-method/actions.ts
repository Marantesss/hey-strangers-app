'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import stripe from '@/lib/stripe'
import { getMe } from '../me/me.service'
import { deletePaymentMethod } from './delete-payment-method.service'

const DeletePaymentMethodSchema = z.object({
  paymentMethodId: z.string(),
})

export type DeletePaymentMethodActionState = {
  success?: boolean
  error?: string
}

export async function deletePaymentMethodAction(
  previousState: DeletePaymentMethodActionState,
  formData: FormData,
): Promise<DeletePaymentMethodActionState> {
  try {
    const validatedFields = DeletePaymentMethodSchema.safeParse({
      paymentMethodId: formData.get('paymentMethodId'),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid payment method ID',
      }
    }

    const user = await getMe()
    if (!user) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(validatedFields.data.paymentMethodId)

    if (paymentMethod.customer !== user.stripeCustomerId) {
      return {
        success: false,
        error: 'Payment method not found',
      }
    }

    await deletePaymentMethod(validatedFields.data.paymentMethodId)
  } catch (error: any) {
    console.error('Error deleting payment method:', error)
    return {
      success: false,
      error: error.message || 'Failed to delete payment method',
    }
  }

  revalidatePath('/')

  return { success: true }
}
