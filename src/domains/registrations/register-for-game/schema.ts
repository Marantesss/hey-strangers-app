import { z } from 'zod'

export const RegisterForGamePaymentConfirmationSchema = z.object({
  paymentIntentId: z.string(),
})

export type RegisterForGamePaymentConfirmationValues = z.infer<
  typeof RegisterForGamePaymentConfirmationSchema
>

export const RegisterForGameSchema = z.object({
  gameId: z.string(),
  playerCount: z.number().positive().default(1),
  paymentMethod: z.enum(['card']),
  // use an already existing payment method
  paymentMethodId: z.string().optional(),
  // create a new payment method
  newPaymentMethod: z
    .object({
      name: z.string(),
      cardToken: z.string(),
      country: z.string(),
      postalCode: z.string(),
    })
    .optional(),
})

export type RegisterForGameValues = z.infer<typeof RegisterForGameSchema>
