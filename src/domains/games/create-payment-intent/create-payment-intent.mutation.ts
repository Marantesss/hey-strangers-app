import useSWRMutation from 'swr/mutation'
import { PaymentIntentResponse, PaymentIntentValues } from './schema'
import api from '@/lib/api'

type CreatePaymentIntentArgs = {
  id: string
  body: PaymentIntentValues
}

const useCreatePaymentIntentMutation = () => {
  return useSWRMutation<PaymentIntentResponse, Error, string, CreatePaymentIntentArgs>(
    '/payment-intent',
    (url, { arg }) => api.post<PaymentIntentResponse>(`/games/${arg.id}/payment-intent`, arg.body),
  )
}

export default useCreatePaymentIntentMutation
