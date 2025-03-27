import { z } from 'zod'

export const SignupSchema = z.object({
  phone: z
    .string()
    .nonempty()
    .transform((value) => value.replace(/\s/g, '')),
  quizAnswers: z.string().transform((value) => {
    try {
      return JSON.parse(value) as Record<string, string>
    } catch (e) {
      throw new Error('Invalid JSON string for quiz answers')
    }
  }),
})

export const OTPVerificationSchema = SignupSchema.omit({ quizAnswers: true }).extend({
  phone: z.string().nonempty(),
  otp: z.string().nonempty(),
})
