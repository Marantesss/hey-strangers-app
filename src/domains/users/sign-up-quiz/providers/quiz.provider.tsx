'use client'

import { PropsWithChildren, useState } from 'react'
import { QuizContext } from '../contexts/quiz.context'
import { Quiz } from '@payload-types'
import { useSearchParams } from 'next/navigation'

type QuizProviderProps = PropsWithChildren<{ quiz: Quiz }>

const QuizProvider: React.FC<QuizProviderProps> = ({ children, quiz }) => {
  const searchParams = useSearchParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({
    location: searchParams.get('location')
      ? (quiz.questions
          .find((question) => question.key === 'location')
          ?.options.find((option) => option.label === searchParams.get('location'))?.value ?? '')
      : '',
    sport: searchParams.get('sport')
      ? (quiz.questions
          .find((question) => question.key === 'sport')
          ?.options.find((option) => option.label === searchParams.get('sport'))?.value ?? '')
      : '',
  })

  const setAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <QuizContext.Provider value={{ quiz, currentQuestion, setCurrentQuestion, answers, setAnswer }}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider
