'use client';

import { cn } from '@/lib/utils';
import './styles.css';
import { useQuiz } from '../../hooks/quiz.hook';

interface WordCycleProps extends React.HTMLAttributes<HTMLSpanElement> {
  words: string[];
  interval?: number; // Time between word changes in milliseconds
}

const WordCycle: React.FC<WordCycleProps> = ({ words, interval = 3_000, className, ...rest }) => {
  const quiz = useQuiz()

  const sport = quiz.answers.sport
  
  if (sport) {
    return (
      <span className='absolute'>{sport}</span>
    )
  }

  return (
    <div
      {...rest}
      className={cn("slidingVertical", className)}
    >
      {words.map((word, index) => (
        <span key={index}>{word}</span>
      ))}
    </div>
  );
}

export default WordCycle;
