import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PaymentInformationForm from '@/domains/users/add-payment-information/components/PaymentInformationForm'
import ProfileForm from '@/domains/users/edit-profile/components/ProfileForm'
import PaymentCard from '@/domains/users/get-payment-methods/components/PaymentCard'
import { getPaymentMethods } from '@/domains/users/get-payment-methods/get-payment-methods.service'
import { getMe } from '@/domains/users/me/me.service'
import { NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import { headers } from 'next/headers'

type ProfilePageProps = {
  searchParams: Promise<{
    success?: string
    error?: string
  }>
}

const ProfilePage: NextPage<ProfilePageProps> = async () => {
  const user = await getMe()
  const paymentMethods = await getPaymentMethods(user!.id)
  const t = await getTranslations('profile')
  const hasPaymentMethods = paymentMethods.length > 0
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    undefined

  return (
    <main className="my-8 space-y-8 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{t('basic-information')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm user={user!} ip={ip} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('payment-information')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {hasPaymentMethods ? (
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <PaymentCard key={method.id} paymentMethod={method} />
                ))}
              </div>
            ) : (
              <div className="text-center text-sm text-gray-500">{t('no-payment-methods')}</div>
            )}
            <hr className="border-t border-gray-200" />

            <PaymentInformationForm />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default ProfilePage
