'use client'

import { cn } from '@/lib/utils'
import { Sport as PayloadSport } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SportCycleProps extends React.HTMLAttributes<HTMLSpanElement> {
  sports: PayloadSport[]
}

const SportCycle: React.FC<SportCycleProps> = ({ sports, className, ...rest }) => {
  const [index, setIndex] = useState(0)
  const sportNames = sports.map((sport) => sport.name)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sportNames.length)
    }, 3000) // 3 seconds

    return () => clearInterval(interval)
  }, [sportNames.length])

  return (
    <span {...rest} className={cn('inline-block font-bold', className)}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.5 }}
          className="inline-block" // Ensures it takes space
        >
          {sportNames[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default SportCycle
