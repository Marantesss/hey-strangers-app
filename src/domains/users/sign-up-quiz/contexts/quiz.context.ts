import { Quiz } from '@payload-types'
import { createContext } from 'react'

interface QuizContextType {
  quiz: Quiz
  currentQuestion: number
  setCurrentQuestion: (question: number) => void
  answers: Record<string, string>
  setAnswer: (key: string, value: string) => void
}

export const QuizContext = createContext<QuizContextType>({} as QuizContextType)
