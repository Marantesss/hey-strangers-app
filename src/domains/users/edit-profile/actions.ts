'use server'

import { z } from 'zod'
import { getCurrentUser, updateUser } from '../shared/UserService'

const UpdateProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  city: z.string().min(1),
  profilePicture: z.any().optional(),
})

export type UpdateProfileActionState = {
  success?: boolean
  data?: {
    name?: string
    email?: string
    phone?: string
    city?: string
    profilePicture?: File
  }
  error?: {
    name?: string
    email?: string
    phone?: string
    city?: string
    profilePicture?: string
  }
}

export const updateProfileAction = async (
  previousState: UpdateProfileActionState,
  formData: FormData,
): Promise<UpdateProfileActionState> => {
  const { success, data, error } = UpdateProfileSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    city: formData.get('city'),
    profilePicture: formData.get('profilePicture'),
  })

  if (!success) {
    return {
      success: false,
      error: {
        name: error.formErrors.fieldErrors.name?.[0],
        email: error.formErrors.fieldErrors.email?.[0],
        phone: error.formErrors.fieldErrors.phone?.[0],
        city: error.formErrors.fieldErrors.city?.[0],
        profilePicture: error.formErrors.fieldErrors.profilePicture?.[0],
      },
    }
  }

  try {
    const user = await getCurrentUser()
    await updateUser({ id: user!.id, data })
  } catch (error) {
    return {
      success: false,
    }
  }

  return {
    data,
    success: true,
  }
}
