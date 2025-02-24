import { Button } from "@/components/ui/button";
import WordCycle from "@/features/quiz/components/WordCycle";
import Link from "next/link";

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

export default function StartPage() {
  return (
    <main className="bg-hero flex flex-col items-center justify-center h-screen gap-6">
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

      <Button asChild>
        <Link href="/sign-up">
          Take the quiz
        </Link>
      </Button>

      <Button variant="ghost" asChild>
        <Link className="text-subtle-foreground" href="/sign-in">
          I already have an account
        </Link>
      </Button>
    </main>
  );
}
