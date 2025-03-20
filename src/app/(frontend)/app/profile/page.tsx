import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PaymentInformationForm from '@/domains/users/add-payment-information/components/PaymentInformationForm'
import ProfileForm from '@/domains/users/edit-profile/components/ProfileForm'
import { getCurrentUser, getPaymentMethods } from '@/domains/users/shared/UserService'
import { NextPage } from 'next'

type ProfilePageProps = {
  searchParams: Promise<{
    success?: string
    error?: string
  }>
}

const ProfilePage: NextPage<ProfilePageProps> = async () => {
  const user = await getCurrentUser()
  const paymentMethods = await getPaymentMethods(user!.id)

  return (
    <main className="my-8 space-y-8 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm user={user!} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentInformationForm user={user!} paymentMethods={paymentMethods} />
        </CardContent>
      </Card>
    </main>
  )
}

export default ProfilePage
