import WordCycle from "@/features/auth/components/WordCycle";
import QuizProvider from "@/features/auth/providers/quiz.provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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

        <div className="col-span-1">
          {children}
        </div>
      </div>
    </QuizProvider>
  );
}
