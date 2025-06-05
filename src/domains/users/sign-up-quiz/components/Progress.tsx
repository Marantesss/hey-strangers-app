'use client'

import { cn } from '@/lib/utils'
import { Fragment, useRef, useEffect, useState } from 'react'
import { useQuiz } from '../hooks/quiz.hook'

const Progress: React.FC = () => {
  const { quiz, currentQuestion } = useQuiz()
  const numberOfQuestions = quiz.questions.length

  // Refs e estados para medições
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState<number>(0)

  useEffect(() => {
    if (containerRef.current && stepRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const stepW = stepRef.current.offsetWidth
      const separatorW = separatorRef.current?.offsetWidth || 0
      // gap-3 do tailwind = 0.75rem = 12px
      const gapW = 12
      const totalStep = stepW + gapW + separatorW + gapW
      const inView = Math.floor(containerWidth / totalStep)

      // Cálculo do deslocamento
      let newTranslateX = 0
      if (numberOfQuestions > inView) {
        const half = Math.floor(inView / 2)

        if (currentQuestion > half) {
          // Até o último grupo visível
          const maxTranslate = (numberOfQuestions - inView) * totalStep
          const desired = (currentQuestion - half) * totalStep
          newTranslateX = Math.min(desired, maxTranslate)
        }
      }
      setTranslateX(newTranslateX)
    }
  }, [numberOfQuestions, currentQuestion])

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        className="flex gap-3 items-center transition-transform duration-300"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        {Array.from({ length: numberOfQuestions }).map((_, index) => (
          <Fragment key={index}>
            <div
              ref={index === 0 ? stepRef : undefined}
              className={cn(
                'text-sm w-6 h-6 shrink-0 rounded-full inline-flex items-center justify-center',
                {
                  'bg-primary text-primary-foreground': index === currentQuestion,
                  'bg-neutral-200 text-[#454745]': index !== currentQuestion,
                },
              )}
            >
              {index + 1}
            </div>
            {index !== numberOfQuestions - 1 && (
              <div ref={separatorRef} className="w-2 shrink-0 h-px bg-neutral-200" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Progress
