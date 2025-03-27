'use client'

import { PropsWithChildren, useState } from 'react'
import { QuizContext } from '../contexts/quiz.context'
import { Quiz } from '@payload-types'

type QuizProviderProps = PropsWithChildren<{ quiz: Quiz }>

const QuizProvider: React.FC<QuizProviderProps> = ({ children, quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

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
