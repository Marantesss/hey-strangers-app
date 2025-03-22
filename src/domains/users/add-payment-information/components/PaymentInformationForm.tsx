'use client'

import { startTransition, useActionState, useEffect, useState } from 'react'
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/payload-types'
import { toast } from 'sonner'
import { createPaymentMethodAction, CreatePaymentMethodActionState } from '../actions'
import SelectCountry from '@/components/common/SelectCountry'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentInformationFormProps {
  user: User
}

interface PaymentMethodFormProps {
  user: User
  onSuccess?: () => void
  onError?: (error: string) => void
}

function PaymentMethodForm({ user, onSuccess, onError }: PaymentMethodFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    zipCode: '',
  })

  const [createPaymentMethodState, dispatchCreatePaymentMethod, isCreatePaymentMethodPending] =
    useActionState<CreatePaymentMethodActionState, FormData>(createPaymentMethodAction, {
      success: false,
    })

  useEffect(() => {
    if (createPaymentMethodState.success) {
      onSuccess?.()
    } else if (createPaymentMethodState.error) {
      onError?.(createPaymentMethodState.error)
    }
  }, [createPaymentMethodState.error, createPaymentMethodState.success, onError, onSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error('Card element not found')

      const { token, error } = await stripe.createToken(cardElement)
      if (error) throw error

      const formDataToSend = new FormData()
      formDataToSend.append('userId', user.id)
      formDataToSend.append('name', formData.name)
      formDataToSend.append('cardToken', token.id)
      formDataToSend.append('country', formData.country)
      formDataToSend.append('postalCode', formData.zipCode)

      startTransition(() => {
        dispatchCreatePaymentMethod(formDataToSend)
      })
    } catch (error: any) {
      onError?.(error.message || 'Failed to add card')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add new card</h2>

      <div className="space-y-2">
        <Label>Billed to</Label>
        <Input
          disabled={isCreatePaymentMethodPending}
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Card Details</Label>
        <div className="p-3 border rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Country</Label>
        <SelectCountry
          disabled={isCreatePaymentMethodPending}
          placeholder="Country"
          value={formData.country}
          onValueChange={(value) => setFormData({ ...formData, country: value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Zip Code</Label>
        <Input
          disabled={isCreatePaymentMethodPending}
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isCreatePaymentMethodPending}>
        {isCreatePaymentMethodPending ? 'Saving...' : 'Save card'}
      </Button>
    </form>
  )
}

const PaymentInformationForm: React.FC<PaymentInformationFormProps> = ({ user }) => {
  const [showAddCard, setShowAddCard] = useState(false)

  return (
    <div>
      {!showAddCard ? (
        <Button variant="outline" className="w-full mt-4" onClick={() => setShowAddCard(true)}>
          Add new card
        </Button>
      ) : (
        <Elements stripe={stripePromise}>
          <PaymentMethodForm
            user={user}
            onSuccess={() => {
              setShowAddCard(false)
              toast.success('Card added successfully')
            }}
            onError={(error) => {
              toast.error(error)
            }}
          />
        </Elements>
      )}
    </div>
  )
}

export default PaymentInformationForm
