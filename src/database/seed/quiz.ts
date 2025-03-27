import { Payload } from 'payload'
import { Quiz } from '@/payload-types'

type QuizSeed = Omit<Quiz, 'createdAt' | 'id' | 'updatedAt'>

export const seedQuiz = async (payload: Payload) => {
  const quizDataPT = {
    sports: [{ name: 'Futebol' }, { name: 'Padel' }, { name: 'Ténis' }, { name: 'Golfe' }],
    questions: [
      {
        key: 'sport',
        title: 'Escolha seu esporte para começar!',
        options: [
          { label: 'Futebol', value: 'soccer' },
          { label: 'Padel', value: 'padel' },
          { label: 'Ténis (em breve)', value: 'tennis', enabled: false },
          { label: 'Golfe (em breve)', value: 'golf', enabled: false },
        ],
      },
      {
        key: 'location',
        title: 'Onde você gostaria de jogar?',
        options: [
          { label: 'Lisboa', value: 'lisbon' },
          { label: 'Porto', value: 'porto' },
        ],
      },
      {
        key: 'skill',
        title: 'Como você avalia sua habilidade geral?',
        options: [
          { label: 'Sou novo neste esporte e ainda estou aprendendo.', value: 'beginner' },
          { label: 'Tenho alguma experiência e posso jogar com confiança.', value: 'intermediate' },
          { label: 'Sou altamente qualificado e gosto de desafios.', value: 'advanced' },
        ],
      },
      {
        key: 'frequency',
        title: 'Com que frequência você joga?',
        options: [
          { label: 'Raramente, apenas por diversão de vez em quando', value: 'rarely' },
          { label: 'Algumas vezes por mês', value: 'a_few_times_a_month' },
          { label: 'Semanalmente ou mais', value: 'weekly_or_more' },
        ],
      },
      {
        key: 'competitiveness',
        title: 'Quão competitivo você é?',
        options: [
          { label: 'Estou aqui para me divertir, não para marcar pontos.', value: 'casual' },
          { label: 'Gosto de competição amigável, mas nada muito intenso.', value: 'competitive' },
          { label: 'Vamos lá—adoro um bom desafio!', value: 'serious' },
        ],
      },
      {
        key: 'experience',
        title: 'Há quanto tempo você joga?',
        options: [
          { label: 'Menos de 6 meses', value: 'less_than_6_months' },
          { label: '6 meses a 2 anos', value: '6_months_to_2_years' },
          { label: '2 anos ou mais', value: '2_years_or_more' },
        ],
      },
      {
        key: 'opponents',
        title: 'Que tipo de oponentes você geralmente joga contra?',
        options: [
          {
            label: 'Iniciantes: Pessoas que também são novas ou jogadores casuais.',
            value: 'beginners',
          },
          { label: 'Misto: Uma variedade de níveis de habilidade.', value: 'mixed' },
          { label: 'Competitivos: Pessoas que levam o jogo a sério.', value: 'competitive' },
        ],
      },
      {
        key: 'tournaments',
        title: 'Você já jogou em partidas ou torneios organizados?',
        options: [
          { label: 'Não, apenas jogos casuais', value: 'no' },
          { label: 'Sim, ocasionalmente', value: 'occasionally' },
          { label: 'Sim, regularmente', value: 'regularly' },
        ],
      },
    ],
  }

  const quizPT = await payload.updateGlobal({
    slug: 'quiz',
    data: quizDataPT,
    locale: 'pt',
  })

  console.log('✅ 🇵🇹 Quiz seeded successfully')

  const quizDataEN = {
    sports: [
      { id: quizPT.sports[0].id!, name: 'Soccer' },
      { id: quizPT.sports[1].id!, name: 'Padel' },
      { id: quizPT.sports[2].id!, name: 'Tennis' },
      { id: quizPT.sports[3].id!, name: 'Golf' },
    ],
    questions: [
      {
        id: quizPT.questions[0].id!,
        title: 'Choose your sport to get started!',
        options: [
          { id: quizPT.questions[0].options[0].id!, label: 'Soccer' },
          { id: quizPT.questions[0].options[1].id!, label: 'Padel' },
          { id: quizPT.questions[0].options[2].id!, label: 'Tennis (soon)' },
          { id: quizPT.questions[0].options[3].id!, label: 'Golf (soon)' },
        ],
      },
      {
        id: quizPT.questions[1].id!,
        title: 'Where would you like to play?',
        options: [
          { id: quizPT.questions[1].options[0].id!, label: 'Lisbon' },
          { id: quizPT.questions[1].options[1].id!, label: 'Porto' },
        ],
      },
      {
        id: quizPT.questions[2].id!,
        title: 'How would you rate your overall skill in?',
        options: [
          {
            id: quizPT.questions[2].options[0].id!,
            label: "I'm new to this sport and still learning.",
          },
          {
            id: quizPT.questions[2].options[1].id!,
            label: "I've got some experience and can play confidently.",
          },
          {
            id: quizPT.questions[2].options[2].id!,
            label: "I'm highly skilled and enjoy a challenge.",
          },
        ],
      },
      {
        id: quizPT.questions[3].id!,
        title: 'How often do you play?',
        options: [
          { id: quizPT.questions[3].options[0].id!, label: 'Rarely, just for fun now and then' },
          { id: quizPT.questions[3].options[1].id!, label: 'A few times a month' },
          { id: quizPT.questions[3].options[2].id!, label: 'Weekly or more' },
        ],
      },
      {
        id: quizPT.questions[4].id!,
        title: 'How competitive are you?',
        options: [
          {
            id: quizPT.questions[4].options[0].id!,
            label: "I'm here for fun, not to keep score.",
          },
          {
            id: quizPT.questions[4].options[1].id!,
            label: 'I enjoy friendly competition but nothing too intense.',
          },
          {
            id: quizPT.questions[4].options[2].id!,
            label: 'Bring it on—I love a good challenge!',
          },
        ],
      },
      {
        id: quizPT.questions[5].id!,
        title: 'How long have you been playing?',
        options: [
          { id: quizPT.questions[5].options[0].id!, label: 'Less than 6 months' },
          { id: quizPT.questions[5].options[1].id!, label: '6 months to 2 years' },
          { id: quizPT.questions[5].options[2].id!, label: '2 years or more' },
        ],
      },
      {
        id: quizPT.questions[6].id!,
        title: 'What type of opponents do you usually play against?',
        options: [
          {
            id: quizPT.questions[6].options[0].id!,
            label: 'Beginners: People who are also new or casual players.',
          },
          {
            id: quizPT.questions[6].options[1].id!,
            label: 'Mixed: A variety of skill levels.',
          },
          {
            id: quizPT.questions[6].options[2].id!,
            label: 'Competitive: People who take the game seriously.',
          },
        ],
      },
      {
        id: quizPT.questions[7].id!,
        title: 'Have you ever played in organized matches or tournaments?',
        options: [
          { id: quizPT.questions[7].options[0].id!, label: 'No, just casual games' },
          { id: quizPT.questions[7].options[1].id!, label: 'Yes, occasionally' },
          { id: quizPT.questions[7].options[2].id!, label: 'Yes, regularly' },
        ],
      },
    ],
  }

  await payload.updateGlobal({
    slug: 'quiz',
    data: quizDataEN,
    locale: 'en',
  })

  console.log('✅ 🇬🇧 Quiz seeded successfully')
}
