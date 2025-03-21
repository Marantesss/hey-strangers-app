import { Endpoint } from 'payload'
import { getPaymentMethods } from './get-payment-methods.service'

const getPaymentMethodsEndpoint: Endpoint = {
  path: '/payment-methods',
  method: 'get',
  handler: async ({ user }) => {
    if (!user) {
      throw new Error('Unauthorized')
    }

    const paymentMethods = await getPaymentMethods(user.id)

    return Response.json({
      data: paymentMethods,
    })
  },
}

export default getPaymentMethodsEndpoint
