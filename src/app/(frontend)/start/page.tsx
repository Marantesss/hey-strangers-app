import WordCycle from '@/components/common/WordCycle'
import { Button } from '@/components/ui/button'
import { NextPage } from 'next'
import Link from 'next/link'

const StartPage: NextPage = () => {
  return (
    <main className="bg-hero flex flex-col items-center justify-center h-screen gap-6">
      <div className="text-6xl font-black text-center">
        <h2>
          <span>Play</span>
          <WordCycle />
        </h2>
        <h2>with friendly strangers</h2>
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
