import api from '@/lib/api'
import Stripe from 'stripe'
import useSWR from 'swr'

export const USE_PAYMENT_METHODS_QUERY_KEY = 'payment-methods'

type GetPaymentMethodsResponse = {
  data: Stripe.PaymentMethod[]
}

const usePaymentMethodsQuery = () =>
  useSWR(USE_PAYMENT_METHODS_QUERY_KEY, () =>
    api.get<GetPaymentMethodsResponse>('users/payment-methods'),
  )

export default usePaymentMethodsQuery
