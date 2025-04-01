'use client'

import { useActionState, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { User } from '@/payload-types'
import { updateProfileAction, UpdateProfileActionState } from '../actions'
import { toast } from 'sonner'
import PhoneNumberInput from '@/components/common/Form/PhoneNumberInput'
import { useTranslations } from 'next-intl'

const SELECTABLE_CITIES = [
  {
    id: 'lisbon',
    name: 'Lisbon',
  },
  {
    id: 'porto',
    name: 'Porto',
  },
] as const

interface ProfileFormProps {
  user: User
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [updateProfileResponse, dispatchUpdateProfile, updateProfilePending] = useActionState<
    UpdateProfileActionState,
    FormData
  >(updateProfileAction, {
    data: {
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phoneNumber,
      city: user.city ?? '',
    },
  })
  const t = useTranslations('profile.form')

  const [profilePicture, setProfilePicture] = useState<string | undefined>(() => {
    if (typeof user.profilePicture === 'object') {
      return user.profilePicture?.url ?? undefined
    }
    return undefined
  })

  return (
    <form action={dispatchUpdateProfile} className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage className="object-cover" src={profilePicture} id="avatarPreview" />
            <AvatarFallback>
              {updateProfileResponse.data?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            name="profilePicture"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                if (file.size > 2 * 1024 * 1024) {
                  toast.error(t('profile-picture.file-size-error'))
                  return
                }
                const reader = new FileReader()
                reader.onload = (e) => {
                  setProfilePicture(e.target?.result as string)
                }
                reader.readAsDataURL(file)
              }
            }}
          />
          <Button
            type="button"
            variant="link"
            className="text-[#1BA781] hover:text-[#1BA781]/80 uppercase"
            onClick={() => {
              document.getElementById('profilePicture')?.click()
            }}
          >
            {t('profile-picture.upload-button')}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">{t('name.label')}</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder={t('name.placeholder')}
          defaultValue={updateProfileResponse.data?.name ?? ''}
          disabled={updateProfilePending}
        />
        {updateProfileResponse.error?.name && (
          <p className="text-sm text-destructive">{updateProfileResponse.error.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('email.label')}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t('email.placeholder')}
          defaultValue={updateProfileResponse.data?.email ?? ''}
          disabled={updateProfilePending}
        />
        {updateProfileResponse.error?.email && (
          <p className="text-sm text-destructive">{updateProfileResponse.error.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t('phone.label')}</Label>
        <PhoneNumberInput
          id="phone"
          name="phone"
          placeholder={t('phone.placeholder')}
          defaultValue={updateProfileResponse.data?.phone ?? ''}
          disabled={updateProfilePending}
        />
        {updateProfileResponse.error?.phone && (
          <p className="text-sm text-destructive">{updateProfileResponse.error.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">{t('city.label')}</Label>
        <Select name="city" defaultValue={updateProfileResponse.data?.city ?? ''}>
          <SelectTrigger className="rounded-sm">
            <SelectValue placeholder={t('city.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {SELECTABLE_CITIES.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {updateProfileResponse.error?.city && (
          <p className="text-sm text-destructive">{updateProfileResponse.error.city}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={updateProfilePending}>
        {updateProfilePending ? t('submit.loading') : t('submit.label')}
      </Button>
    </form>
  )
}

export default ProfileForm
