// import WordCycle from "@/features/user/components/WordCycle";
// import QuizProvider from "@/features/user/providers/quiz.provider";

import WordCycle from '@/components/common/WordCycle'
import { getCurrentUser } from '@/domains/users/shared/UserService'
import QuizProvider from '@/domains/users/sign-up-quiz/quiz.provider'
import { redirect } from 'next/navigation'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (user) {
    return redirect('/app')
  }

  return (
    <QuizProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="hidden col-span-1 bg-hero md:flex flex-col items-center justify-center gap-6">
          <div className="text-6xl font-black text-center">
            <h2>
              <span>Play</span>
              <WordCycle />
            </h2>
            <h2>with friendly strangers</h2>
          </div>
        </div>

        <div className="col-span-1 container">{children}</div>
      </div>
    </QuizProvider>
  )
}
