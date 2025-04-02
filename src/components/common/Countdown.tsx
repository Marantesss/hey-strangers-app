'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
interface CountdownProps extends React.HTMLAttributes<HTMLSpanElement> {
  date: Date
}

const Countdown: React.FC<CountdownProps> = ({ date, ...props }) => {
  const t = useTranslations('components.countdown')

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = date.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [date])

  return (
    <span {...props}>
      {t('days', { count: timeLeft.days })} {t('hours', { count: timeLeft.hours })}{' '}
      {t('minutes', { count: timeLeft.minutes })} {t('seconds', { count: timeLeft.seconds })}
    </span>
  )
}

export default Countdown
