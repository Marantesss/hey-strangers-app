import { z } from 'zod'

export const PaymentIntentParamsSchema = z.object({
  id: z.string(),
})

export const PaymentIntentBodySchema = z.object({
  playerCount: z.number().positive().default(1),
  paymentMethodId: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
})

export type PaymentIntentValues = z.infer<typeof PaymentIntentBodySchema>

export type PaymentIntentResponse = {
  clientSecret?: string
  error?: string
}
