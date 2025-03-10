'use client';

import { cn } from '@/lib/utils';
import './styles.css';
import { useQuiz } from '../../hooks/quiz.hook';
import { Enums } from '@/utils/supabase/types';

const sportMap: Record<Enums<'game_sport_type'>, string> = {
  'soccer': 'Soccer',
  'padel': 'Padel',
  'tennis': 'Tennis',
  'basketball': 'Basketball',
  'volleyball': 'Volleyball',
} as const

const sports = Object.values(sportMap)

const LONGEST_WORD = sports.reduce((longest, current) => {
  return current.length > longest.length ? current : longest;
}, sports[0]);

interface WordCycleProps extends React.HTMLAttributes<HTMLSpanElement> { }

const WordCycle: React.FC<WordCycleProps> = ({ className, ...rest }) => {
  const quiz = useQuiz()

  const sport = quiz.answers.sport
  
  return (
    <span
      {...rest}
      className={cn(
        "bg-white rounded-2xl inline-block px-4 py-1 ml-2 text-primary",
        className
      )}
    >
      { !!sport
      ? <span>{sportMap[sport]}</span>
      : (
        <>
          <span className="slidingVertical">
            {sports.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </span>
          <span className="invisible">{LONGEST_WORD}</span>
        </>
        )
      }
    </span>
  );
}

export default WordCycle;
