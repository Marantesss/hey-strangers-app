import { z } from 'zod'

export const SignupSchema = z.object({
  phone: z
    .string()
    .nonempty()
    .transform((value) => value.replace(/\s/g, '')),
})

export const OTPVerificationSchema = SignupSchema.extend({
  otp: z.string().nonempty(),
})
