'use client'

import { Button } from '@/components/ui/button'
import Stripe from 'stripe'
import { deletePaymentMethodAction, DeletePaymentMethodActionState } from '../actions'
import { startTransition, useActionState, useEffect } from 'react'

interface PaymentCardProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  paymentMethod: Stripe.PaymentMethod
}
const DeletePaymentMethodButton: React.FC<PaymentCardProps> = ({
  paymentMethod,
  onSuccess,
  onError,
}) => {
  const [deletePaymentMethodState, dispatchDeletePaymentMethod, isDeletePending] = useActionState<
    DeletePaymentMethodActionState,
    FormData
  >(deletePaymentMethodAction, {})

  const handleDelete = () => {
    const formData = new FormData()
    formData.append('paymentMethodId', paymentMethod.id)
    startTransition(() => {
      dispatchDeletePaymentMethod(formData)
    })
  }

  useEffect(() => {
    if (deletePaymentMethodState.success) {
      onSuccess?.()
    } else if (deletePaymentMethodState.error) {
      onError?.(deletePaymentMethodState.error)
    }
  }, [deletePaymentMethodState.error, deletePaymentMethodState.success, onError, onSuccess])

  return (
    <Button
      size="sm"
      type="submit"
      variant="ghost"
      className="text-gray-600 hover:text-gray-700"
      disabled={isDeletePending}
      onClick={handleDelete}
    >
      REMOVE
    </Button>
  )
}

export default DeletePaymentMethodButton
