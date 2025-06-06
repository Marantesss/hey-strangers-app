import { z } from 'zod'

export const PaymentIntentParamsSchema = z.object({
  id: z.string(),
})

export const PaymentIntentBodySchema = z.object({
  inviterId: z.string().optional(),
  playerCount: z.number().positive().default(1),
  paymentMethod: z.enum(['card']),
  paymentMethodId: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  newPaymentMethod: z
    .object({
      name: z.string(),
      country: z.string(),
      postalCode: z.string(),
      token: z.string(),
    })
    .optional(),
})

export type PaymentIntentValues = z.infer<typeof PaymentIntentBodySchema>

export type PaymentIntentResponse = {
  clientSecret?: string
  error?: string
}
