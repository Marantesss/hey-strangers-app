"use client"

import { Button } from '@/components/ui/button';
import { Answers } from '../../contexts/quiz.context';
import { useQuiz } from '../../hooks/quiz.hook';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useState } from 'react';
import GameCard from '@/features/game/components/GameCard';
import RegisterForm from '../RegisterForm';
import { Game } from '@/features/game/models/Game';


const Quiz: React.FC = () => {
  const quiz = useQuiz()
  const [showResults, setShowResults] = useState(false)

  const isFirstQuestion = quiz.currentQuestion === 0
  const isLastQuestion = quiz.currentQuestion === quiz.questions.length - 1

  const isCurrentAnswered = quiz.answers[quiz.questions[quiz.currentQuestion].id] !== null
  
  const sport = quiz.answers.sport
  const currentQuestion = quiz.questions[quiz.currentQuestion]

  const handleOptionSelect = (optionId: string) => {
    quiz.setAnswer(quiz.questions[quiz.currentQuestion].id, optionId as Answers[keyof Answers]);
  };

  const handlePreviousQuestion = () => {
    if (showResults) {
      setShowResults(false)
    } else if (quiz.currentQuestion > 0) {
      quiz.setCurrentQuestion(quiz.currentQuestion - 1)
    }
  }

  const handleNextQuestion = () => {
    if (isCurrentAnswered && !isLastQuestion) {
      quiz.setCurrentQuestion(quiz.currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  return (
    <div className='flex flex-col gap-12 w-full max-w-lg'>
      {!showResults ? (
        <>
          <h2 className='text-3xl font-bold'>
            {currentQuestion.title(sport ?? "")}
          </h2>

        <div className='flex flex-col gap-2'>
          {currentQuestion.options.map(option => (
            <div
              key={option.value}
              className={cn('cursor-pointer inline-flex items-center gap-2 p-4 rounded text-[#454745]', {
                'bg-[#F9F9FB] font-semibold': quiz.answers[currentQuestion.id] === option.value,
                'text-gray-400 cursor-not-allowed': option.enabled === false,
              })}
              onClick={() => option.enabled !== false && handleOptionSelect(option.value)}
            >
              <div className="w-6 h-6">
                {quiz.answers[currentQuestion.id] === option.value && <Check className='text-primary' />}
              </div>
              <div className='grow'>
                {option.label}
              </div>
            </div>
          ))}
          </div>
          <div className='flex justify-center gap-4'>
            <Button variant="link" disabled={isFirstQuestion} onClick={handlePreviousQuestion}>
              Previous
            </Button>
            <Button variant="default" disabled={!isCurrentAnswered} onClick={handleNextQuestion}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className='text-3xl font-bold text-center'>
            We found 10+ games that match your skills
          </h2>

          <div className='space-y-4'>
            {Game.dummy.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <RegisterForm />
        </>
      )}
    </div>
  );
};

export default Quiz;
