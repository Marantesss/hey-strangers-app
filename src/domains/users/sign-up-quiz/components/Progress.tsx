'use client'

import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { useQuiz } from '../quiz.hook'

const Progress: React.FC = () => {
  const quiz = useQuiz()

  const numberOfQuestions = quiz.questions.length

  return (
    <div className="flex gap-3 items-center">
      {Array.from({ length: numberOfQuestions }).map((_, index) => (
        <Fragment key={index}>
          <div
            className={cn('text-sm w-6 h-6 rounded-full inline-flex items-center justify-center', {
              'bg-primary text-primary-foreground': index === quiz.currentQuestion,
              'bg-neutral-200 text-[#454745]': index !== quiz.currentQuestion,
            })}
          >
            {index + 1}
          </div>
          {index !== numberOfQuestions - 1 && <div className="w-2 h-px bg-neutral-200" />}
        </Fragment>
      ))}
    </div>
  )
}

export default Progress
