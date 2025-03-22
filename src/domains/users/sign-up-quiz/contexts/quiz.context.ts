import { Game } from '@payload-types'
import { createContext } from 'react'

export interface Answers {
  sport: Game['sport'] | null
  location: 'lisbon' | 'porto' | null
  skill: 'beginner' | 'intermediate' | 'advanced' | null
  frequency: 'rarely' | 'a_few_times_a_month' | 'weekly_or_more' | null
  competitiveness: 'casual' | 'competitive' | 'serious' | null
  experience: 'less_than_6_months' | '6_months_to_2_years' | '2_years_or_more' | null
  opponents: 'beginners' | 'mixed' | 'competitive' | null
  tournaments: 'no' | 'occasionally' | 'regularly' | null
}

interface Question {
  id: keyof Answers
  title: (sport: string) => string
  options: {
    label: string
    value: string
    enabled?: boolean
  }[]
}

export const QUESTIONS: Question[] = [
  {
    id: 'sport',
    title: () => 'Choose your sport to get started!',
    options: [
      { label: 'Soccer', value: 'soccer' },
      { label: 'Padel', value: 'padel' },
      { label: 'Tennis (soon)', value: 'tennis', enabled: false },
      { label: 'Golf (soon)', value: 'golf', enabled: false },
    ],
  },
  {
    id: 'location',
    title: (sport: string) => `Where would you like to play ${sport}?`,
    options: [
      { label: 'Lisbon', value: 'lisbon' },
      { label: 'Porto', value: 'porto' },
    ],
  },
  {
    id: 'skill',
    title: (sport: string) => `How would you rate your overall skill in ${sport}?`,
    options: [
      { label: 'I’m new to this sport and still learning.', value: 'beginner' },
      { label: 'I’ve got some experience and can play confidently.', value: 'intermediate' },
      { label: 'I’m highly skilled and enjoy a challenge.', value: 'advanced' },
    ],
  },
  {
    id: 'frequency',
    title: (sport: string) => `How often do you play ${sport}?`,
    options: [
      { label: 'Rarely, just for fun now and then', value: 'rarely' },
      { label: 'A few times a month', value: 'a_few_times_a_month' },
      { label: 'Weekly or more', value: 'weekly_or_more' },
    ],
  },
  {
    id: 'competitiveness',
    title: () => 'How competitive are you?',
    options: [
      { label: 'I’m here for fun, not to keep score.', value: 'casual' },
      { label: 'I enjoy friendly competition but nothing too intense.', value: 'competitive' },
      { label: 'Bring it on—I love a good challenge!', value: 'serious' },
    ],
  },
  {
    id: 'experience',
    title: (sport: string) => `How long have you been playing ${sport}?`,
    options: [
      { label: 'Less than 6 months', value: 'less_than_6_months' },
      { label: '6 months to 2 years', value: '6_months_to_2_years' },
      { label: '2 years or more', value: '2_years_or_more' },
    ],
  },
  {
    id: 'opponents',
    title: () => 'What type of opponents do you usually play against?',
    options: [
      { label: 'Beginners: People who are also new or casual players.', value: 'beginners' },
      { label: 'Mixed: A variety of skill levels.', value: 'mixed' },
      { label: 'Competitive: People who take the game seriously.', value: 'competitive' },
    ],
  },
  {
    id: 'tournaments',
    title: () => 'Have you ever played in organized matches or tournaments?',
    options: [
      { label: 'No, just casual games ', value: 'no' },
      { label: 'Yes, occasionally', value: 'occasionally' },
      { label: 'Yes, regularly', value: 'regularly' },
    ],
  },
] as const

interface QuizContextType {
  questions: typeof QUESTIONS
  currentQuestion: number
  setCurrentQuestion: (question: number) => void
  answers: Answers
  setAnswer: (questionId: keyof Answers, answer: Answers[keyof Answers]) => void
}

export const QuizContext = createContext<QuizContextType>({
  questions: QUESTIONS,
  currentQuestion: 0,
  setCurrentQuestion: () => {},
  answers: {
    sport: null,
    location: null,
    skill: null,
    frequency: null,
    competitiveness: null,
    experience: null,
    opponents: null,
    tournaments: null,
  },
  setAnswer: () => {},
})
