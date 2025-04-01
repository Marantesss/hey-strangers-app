'use client'

import { startTransition, useActionState, useEffect, useState } from 'react'
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createPaymentMethodAction, CreatePaymentMethodActionState } from '../actions'
import SelectCountry from '@/components/common/SelectCountry'
import { UserModel } from '../../shared/models/User.model'
import useSession from '../../session/use-session'
import { useTranslations } from 'next-intl'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentMethodFormProps {
  user: UserModel
  onSuccess?: () => void
  onError?: (error: string) => void
}

function PaymentMethodForm({ user, onSuccess, onError }: PaymentMethodFormProps) {
  const t = useTranslations('profile.payment-form')
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
      <h2 className="text-xl font-semibold">{t('add-card')}</h2>

      <div className="space-y-2">
        <Label>{t('billed-to.label')}</Label>
        <Input
          disabled={isCreatePaymentMethodPending}
          placeholder={t('billed-to.placeholder')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <div className="p-3 rounded-md bg-[#EFF0F3]">
          <CardElement
            options={{
              style: {
                base: {
                  '::placeholder': {
                    color: '#737373',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t('country.label')}</Label>
        <SelectCountry
          disabled={isCreatePaymentMethodPending}
          placeholder={t('country.placeholder')}
          value={formData.country}
          onValueChange={(value) => setFormData({ ...formData, country: value })}
          required
        />

        <Input
          disabled={isCreatePaymentMethodPending}
          placeholder={t('zip-code.placeholder')}
          value={formData.zipCode}
          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isCreatePaymentMethodPending}>
        {isCreatePaymentMethodPending ? t('submit.loading') : t('submit.label')}
      </Button>
    </form>
  )
}

const PaymentInformationForm: React.FC = () => {
  const [showAddCard, setShowAddCard] = useState(false)
  const { user } = useSession()
  const t = useTranslations('profile.payment-form')

  if (!user) return null

  return (
    <div>
      {!showAddCard ? (
        <Button variant="outline" className="w-full mt-4" onClick={() => setShowAddCard(true)}>
          {t('add-card')}
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
