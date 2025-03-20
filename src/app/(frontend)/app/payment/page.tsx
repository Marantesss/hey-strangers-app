'use client'

import { PaymentForm } from '@/components/PaymentForm'
import { toast } from 'sonner'
import { createPaymentIntent } from '@/domains/registrations/register-for-game/actions'
import { useActionState } from 'react'

export default function PaymentPage() {
  const [state, formAction, isPending] = useActionState(createPaymentIntent, {
    clientSecret: null,
  })

  if (state.error) {
    toast.error('Failed to initialize payment')
    console.error('Error:', state.error)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      {!state.clientSecret ? (
        <form action={formAction}>
          <input type="hidden" name="amount" value="10" />
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isPending ? 'Initializing...' : 'Initialize Payment'}
          </button>
        </form>
      ) : (
        <PaymentForm
          clientSecret={state.clientSecret}
          onSuccess={() => {
            toast.success('Payment successful!')
          }}
          onError={(error) => {
            toast.error(error.message)
          }}
        />
      )}
    </div>
  )
}
