'use client'

import { cn } from '@/lib/utils'
import { useQuiz } from '@/domains/users/sign-up-quiz/hooks/quiz.hook'

import './styles.css'
import { useTranslations } from 'next-intl'

interface WordCycleProps extends React.HTMLAttributes<HTMLSpanElement> {}

const WordCycle: React.FC<WordCycleProps> = ({ className, ...rest }) => {
  const t = useTranslations('sign-up.sports')

  const sports = [t('soccer'), t('padel'), t('tennis'), t('basketball'), t('volleyball')]
  const LONGEST_WORD = sports.reduce((longest, current) => {
    return current.length > longest.length ? current : longest
  }, sports[0])

  const { answers, quiz } = useQuiz()

  const selectedSport = quiz.questions
    .find(({ key }) => key === 'sport')
    ?.options.find(({ value }) => value === answers['sport'])

  return (
    <span
      {...rest}
      className={cn('bg-white rounded-2xl inline-block px-4 py-1 ml-2 text-primary', className)}
    >
      {!!selectedSport ? (
        <span>{selectedSport.label}</span>
      ) : (
        <>
          <span className="slidingVertical">
            {sports.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </span>
          <span className="invisible">{LONGEST_WORD}</span>
        </>
      )}
    </span>
  )
}

export default WordCycle
