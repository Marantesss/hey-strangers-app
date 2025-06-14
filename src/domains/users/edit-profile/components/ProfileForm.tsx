'use client'

import { useActionState, useMemo, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/payload-types'
import { updateProfileAction, UpdateProfileActionState } from '../actions'
import { toast } from 'sonner'
import PhoneNumberInput from '@/components/common/Form/PhoneNumberInput'
import { useTranslations } from 'next-intl'
import SelectCity from '@/domains/cities/shared/components/SelectCity'
import { UserModel } from '../../shared/models/User.model'
import { useGeolocationCity } from '@/domains/cities/shared/hooks/useGeolocationCity'

interface ProfileFormProps {
  user: User
  ip?: string
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, ip }) => {
  const userModel = useMemo(() => UserModel.from(user), [user])
  const { defaultCity } = useGeolocationCity(ip)

  const [updateProfileResponse, dispatchUpdateProfile, updateProfilePending] = useActionState<
    UpdateProfileActionState,
    FormData
  >(updateProfileAction, {
    data: {
      name: userModel.name ?? '',
      email: userModel.email ?? '',
      phone: userModel.phoneNumber,
      city: userModel.cityId ?? defaultCity?.id ?? '',
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
        <SelectCity
          name="city"
          defaultValue={updateProfileResponse.data?.city ?? defaultCity?.id ?? ''}
          placeholder={t('city.placeholder')}
          className="rounded-sm"
        />
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
