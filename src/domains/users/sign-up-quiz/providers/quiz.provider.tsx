'use client'

import { PropsWithChildren, useState } from 'react'
import { Answers, QUESTIONS, QuizContext } from '../contexts/quiz.context'

const QuizProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    sport: null,
    location: null,
    skill: null,
    frequency: null,
    competitiveness: null,
    experience: null,
    opponents: null,
    tournaments: null,
  })

  const setAnswer = (questionId: keyof Answers, answer: Answers[keyof Answers]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  // TODO we could fetch the questions from the database or current status from local storage

  return (
    <QuizContext.Provider
      value={{ questions: QUESTIONS, currentQuestion, setCurrentQuestion, answers, setAnswer }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider
