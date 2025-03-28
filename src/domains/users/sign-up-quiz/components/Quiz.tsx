'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { useQuiz } from '../hooks/quiz.hook'
import SignupForm from './SignupForm'
import { useTranslations } from 'next-intl'
import { GameModel } from '@/domains/games/shared/models/Game.model'
import GameCard from '@/domains/games/shared/components/GameCard'

const Quiz: React.FC = () => {
  const { quiz, currentQuestion, setCurrentQuestion, answers, setAnswer } = useQuiz()
  const [showResults, setShowResults] = useState(false)
  const t = useTranslations('sign-up.quiz')

  const isFirstQuestion = currentQuestion === 0
  const isLastQuestion = currentQuestion === quiz.questions.length - 1

  const isCurrentAnswered = !!answers[quiz.questions[currentQuestion].key]

  const currentQuestionObject = quiz.questions[currentQuestion]

  const handleOptionSelect = (value: string) => setAnswer(currentQuestionObject.key, value)

  const handlePreviousQuestion = () => {
    if (showResults) {
      setShowResults(false)
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNextQuestion = () => {
    if (isCurrentAnswered && !isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const dummyGames = quiz.dummyGameResults
    ?.map((game) =>
      GameModel.from({
        ...game,
        id: game.id!,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    )
    .slice(0, 2)

  return (
    <div className="flex flex-col gap-12 w-full max-w-lg">
      {!showResults ? (
        <>
          <h2 className="text-3xl font-bold">{currentQuestionObject.title}</h2>

          <div className="flex flex-col gap-2">
            {currentQuestionObject.options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  'cursor-pointer inline-flex items-center gap-2 p-4 rounded text-[#454745]',
                  {
                    'bg-[#F9F9FB] font-semibold':
                      answers[currentQuestionObject.key] === option.value,
                    'text-gray-400 cursor-not-allowed': option.enabled === false,
                  },
                )}
                onClick={() => option.enabled !== false && handleOptionSelect(option.value)}
              >
                <div className="w-6 h-6">
                  {answers[currentQuestionObject.key] === option.value && (
                    <Check className="text-primary" />
                  )}
                </div>
                <div className="grow">{option.label}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="link" disabled={isFirstQuestion} onClick={handlePreviousQuestion}>
              {t('previous')}
            </Button>
            <Button variant="default" disabled={!isCurrentAnswered} onClick={handleNextQuestion}>
              {t('next')}
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center">{t('results', { count: '+10' })}</h2>

          <div className="space-y-4">
            {dummyGames?.map((game) => <GameCard key={game.id} game={game} simple hidePrice />)}
          </div>

          <SignupForm />
        </>
      )}
    </div>
  )
}

export default Quiz
