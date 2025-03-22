import { User } from '@payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
type UpdateUserData = Omit<Partial<User>, 'profilePicture'> & {
  profilePicture?: File | string
}

export async function updateUser({ id, data }: { id: string; data: UpdateUserData }) {
  const payload = await getPayload({ config })

  // Create a copy of the data object to avoid type issues
  const updateData = { ...data }

  // Handle profile picture upload if present
  if (updateData.profilePicture instanceof File) {
    const file = updateData.profilePicture
    const upload = await payload.create({
      collection: 'media',
      data: {
        alt: 'Profile picture',
      },
      file: {
        data: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    // Replace the File object with the upload ID
    updateData.profilePicture = upload.id
  }

  return payload.update({ collection: 'users', id, data: updateData as Partial<User> })
}
