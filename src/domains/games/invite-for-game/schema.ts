import { z } from 'zod'

export const InviteParamsSchema = z.object({
  id: z.string(),
})

export type InviteParams = z.infer<typeof InviteParamsSchema>
