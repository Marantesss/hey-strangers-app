import SignInForm from '@/domains/users/sign-in-with-otp/components/SignInForm'

export default async function Login() {
  return (
    <main className="relative h-full flex flex-col justify-center items-center">
      <SignInForm />
    </main>
  )
}
