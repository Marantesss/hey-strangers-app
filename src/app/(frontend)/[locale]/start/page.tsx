import WordCycle from '@/components/common/WordCycle'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { headers } from 'next/headers'
import { getLocationFromIp } from '@/lib/geo'

export const revalidate = 60

const StartPage = async () => {
  const headersList = await headers()
  // X-Forwarded-For pode conter múltiplos IPs, pega o primeiro
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    undefined
  const { city, country } = await getLocationFromIp(ip)

  return (
    <main className="bg-hero flex flex-col items-center justify-center h-screen gap-6">
      <div className="text-6xl font-black text-center">
        <h2>
          <span>Play</span>
          <WordCycle />
        </h2>
        <h2>with friendly strangers</h2>
      </div>

      <div className="text-lg text-center mt-4">
        Localização: {city}
        {country ? `, ${country}` : ''}
      </div>

      <Button asChild>
        <Link href="/sign-up">Take the quiz</Link>
      </Button>

      <Button variant="ghost" asChild>
        <Link className="text-subtle-foreground" href="/sign-in">
          I already have an account
        </Link>
      </Button>
    </main>
  )
}

export default StartPage
