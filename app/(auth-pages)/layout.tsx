import WordCycle from "@/features/quiz/components/WordCycle";
import QuizProvider from "@/features/quiz/providers/quiz.provider";

const sports = [
  'Soccer',
  'Basketball',
  'Tennis',
  'Volleyball',
  'Badminton',
]

const LONGEST_WORD = sports.reduce((longest, current) => {
  return current.length > longest.length ? current : longest;
}, sports[0]);

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
              <span className="bg-white rounded-2xl inline-block px-4 py-1 ml-2 text-primary">
                <WordCycle words={sports} />
                <span className="invisible">{LONGEST_WORD}</span>
              </span>
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
