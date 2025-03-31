import { Payload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const seedHome = async (payload: Payload) => {
  const homeDataPT = {
    hero: {
      title: 'Olá estranhos!',
      subtitle: 'Vamos jogar juntos.',
      description:
        'Jogue com estranhos amigáveis—combinados com suas habilidades e preferências por IA.',
      buttonLabel: 'Junte-se à diversão',
      partners: [
        {
          name: 'SIC',
          logo: await payload.create({
            collection: 'media',
            data: { alt: 'Logo SIC' },
            filePath: path.resolve(dirname, 'images/partners/sic.png'),
          }),
        },
        {
          name: 'Time Out',
          logo: await payload.create({
            collection: 'media',
            data: { alt: 'Logo Time Out' },
            filePath: path.resolve(dirname, 'images/partners/time-out.png'),
          }),
        },
        {
          name: 'NIT',
          logo: await payload.create({
            collection: 'media',
            data: { alt: 'Logo NIT' },
            filePath: path.resolve(dirname, 'images/partners/nit.png'),
          }),
        },
        {
          name: 'Business Insider',
          logo: await payload.create({
            collection: 'media',
            data: { alt: 'Logo Business Insider' },
            filePath: path.resolve(dirname, 'images/partners/business-insider.png'),
          }),
        },
      ],
    },
    nextGames: {
      title: 'Próximos Jogos',
      games: [
        {
          emoji: '⚽',
          sport: 'Futebol',
          location: 'Porto',
          description: '2 Equipas de 6 + 2 Suplentes',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de futebol' },
            filePath: path.resolve(dirname, 'images/games/soccer.jpg'),
          }),
          time: new Date('2025-03-27T10:00:00Z').toISOString(),
        },
        {
          emoji: '🎾',
          sport: 'Padel',
          location: 'Porto',
          description: '2 Equipas de 2',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de padel' },
            filePath: path.resolve(dirname, 'images/games/padel.jpg'),
          }),
          time: new Date('2025-03-27T10:00:00Z').toISOString(),
        },
        {
          emoji: '🏸',
          sport: 'Ténis',
          location: 'Porto',
          description: '2 Equipas de 2',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de ténis' },
            filePath: path.resolve(dirname, 'images/games/tennis.jpg'),
          }),
          time: new Date('2025-03-27T10:00:00Z').toISOString(),
        },
        {
          emoji: '⛳',
          sport: 'Golfe',
          location: 'Porto',
          description: '2 Equipas de 2',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de golfe' },
            filePath: path.resolve(dirname, 'images/games/golf.jpg'),
          }),
          time: new Date('2025-03-27T10:00:00Z').toISOString(),
        },
      ],
    },
    howItWorks: {
      title: 'Como a magia acontece',
      subtitle: 'Tornando o desporto social fácil, divertido e amigável.',
      buttonLabel: 'Escolha seu jogo',
      steps: [
        {
          icon: await payload.create({
            collection: 'media',
            data: { alt: 'Ícone como funciona' },
            filePath: path.resolve(dirname, 'images/how-icons/quiz.png'),
          }),
          title: 'Faça nosso teste rápido de 3 minutos',
          description: 'Suas habilidades nos ajudam a encontrar o grupo certo para você.',
        },
        {
          icon: await payload.create({
            collection: 'media',
            data: { alt: 'Ícone como funciona' },
            filePath: path.resolve(dirname, 'images/how-icons/schedule.png'),
          }),
          title: 'Escolha seu jogo e horário',
          description:
            'Navegue por jogos pré-planejados com locais e horários definidos—basta escolher o que funciona melhor para você.',
        },
        {
          icon: await payload.create({
            collection: 'media',
            data: { alt: 'Ícone como funciona' },
            filePath: path.resolve(dirname, 'images/how-icons/show-up.png'),
          }),
          title: 'Apareça e diga olá estranhos',
          description:
            'Nós cuidamos de todo o planejamento. Apenas apareça, conheça novos amigos, jogue seus esportes favoritos e aproveite a experiência!',
        },
      ],
    },
    stats: {
      title: 'Fatos sobre Hey Strangers',
      image: await payload.create({
        collection: 'media',
        data: { alt: 'Imagem de fatos sobre Hey Strangers' },
        filePath: path.resolve(dirname, 'images/stats/running.jpg'),
      }),
      statistics: [
        {
          value: 95,
          label: 'dos jogadores',
          description:
            'dizem que foram perfeitamente combinados com o nível de habilidade do seu grupo.',
        },
        {
          value: 82,
          label: 'dos participantes',
          description: 'recomendariam Hey Stranger aos seus amigos.',
        },
        {
          value: 78,
          label: 'dos jogadores',
          description: 'fizeram conexões duradouras através das nossas atividades esportivas.',
        },
      ],
    },
    testimonials: {
      title: 'Cartas de amor',
      reviews: [
        {
          quote:
            'Juntar-se ao Hey Stranger foi uma mudança de jogo! Eu estava nervoso em conhecer novas pessoas, mas o processo de correspondência foi perfeito. Agora, tenho um grupo regular para futebol, e é o destaque da minha semana!',
          author: 'Alex S.',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de Alex S.' },
            filePath: path.resolve(dirname, 'images/strangers/alex.jpg'),
          }),
        },
        {
          quote:
            'Adoro como é fácil encontrar jogos que se encaixam na minha agenda. A plataforma elimina toda a confusão de organizar, e conheci alguns parceiros incríveis de padel no caminho!',
          author: 'Rita M.',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de Rita M.' },
            filePath: path.resolve(dirname, 'images/strangers/rita.jpg'),
          }),
        },
        {
          quote:
            'Como alguém novo na cidade, o Hey Stranger tornou tão fácil conectar com pessoas que compartilham meu amor pelo tênis. É como ter uma comunidade pronta esperando por você.',
          author: 'Sara C.',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de Sara C.' },
            filePath: path.resolve(dirname, 'images/strangers/sara.jpg'),
          }),
        },
      ],
    },
    cta: {
      title: 'Pronto para começar a jogar?',
      subtitle: 'Faça nosso teste de habilidade',
      buttonLabel: 'Comece Agora',
      sports: [
        {
          name: 'Futebol',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de futebol' },
            filePath: path.resolve(dirname, 'images/games/soccer.jpg'),
          }),
          selected: false,
        },
        {
          name: 'Padel',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de padel' },
            filePath: path.resolve(dirname, 'images/games/padel.jpg'),
          }),
          selected: true,
        },
        {
          name: 'Ténis',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de ténis' },
            filePath: path.resolve(dirname, 'images/games/tennis.jpg'),
          }),
          selected: false,
        },
        {
          name: 'Golfe',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de golfe' },
            filePath: path.resolve(dirname, 'images/games/golf.jpg'),
          }),
          selected: false,
        },
      ],
    },
    strangers: {
      title: 'Conheça alguns dos nossos estranhos',
      strangers: [
        {
          name: 'Emma Carter',
          age: 25,
          bio: 'Uma jogadora de tênis apaixonada que ama tanto competição quanto partidas casuais. Sempre procurando parceiros para treinar em quadras ensolaradas.',
          sport: 'Ténis',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de Emma Carter' },
            filePath: path.resolve(dirname, 'images/strangers/emma.jpg'),
          }),
        },
        {
          name: 'Lucas Martins',
          age: 22,
          bio: 'Um entusiasta dedicado do golfe conhecido por seu grande espírito e tacadas afiadas. Gosta de se conectar com outros fãs de golfe para jogos casuais.',
          sport: 'Golfe',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de Lucas Martins' },
            filePath: path.resolve(dirname, 'images/strangers/lucas.jpg'),
          }),
        },
        {
          name: 'Jake Thompson',
          age: 19,
          bio: 'Um jovem jogador de padel aspirante que adora aprimorar suas habilidades e aprender com seus companheiros de equipe. Procura novos desafios.',
          sport: 'Padel',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de Jake Thompson' },
            filePath: path.resolve(dirname, 'images/strangers/jake.jpg'),
          }),
        },
        {
          name: 'Logan Brown',
          age: 29,
          bio: 'Uma jogadora de padel que equilibra trabalho com seu amor pelo esporte. Sempre pronta para um jogo competitivo mas divertido nos fins de semana.',
          sport: 'Padel',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Imagem de Logan Brown' },
            filePath: path.resolve(dirname, 'images/strangers/logan.jpg'),
          }),
        },
      ],
    },
    whenAndWhere: {
      title: 'Quando & Onde',
      subtitle: 'Seu jogo perfeito, no momento perfeito.',
      buttonLabel: 'Reserve seu jogo agora',
      image: await payload.create({
        collection: 'media',
        data: { alt: 'Imagem Quando & Onde' },
        filePath: path.resolve(dirname, 'images/games/padel-2.jpg'),
      }),
      features: [
        {
          emoji: '🎾',
          title: 'Jogos pré-agendados em locais convenientes',
          description:
            'Nós planejamos tudo para você! Os jogos são realizados em locais bem avaliados, então você sempre sabe exatamente para onde ir.',
        },
        {
          emoji: '⏰',
          title: 'Escolha o horário que funciona para você',
          description:
            'Nossa agenda oferece uma variedade de horários para se adequar ao seu dia—seja uma partida de tênis pela manhã ou um jogo de futebol à noite, você encontrará um horário que lhe convém.',
        },
        {
          emoji: '📍',
          title: 'Fácil acesso a todos os locais',
          description:
            'A localização de cada jogo é facilmente acessível e compartilhada com antecedência. Seja um parque, quadra ou instalação esportiva, você receberá todos os detalhes com antecedência.',
        },
        {
          emoji: '📅',
          title: 'Opções flexíveis para cada agenda',
          description:
            'Não pode fazer uma partida? Sem problemas—basta escolher outro horário ou dia que funcione melhor para você!',
        },
      ],
    },
    numbers: {
      title: 'Hey Strangers em números',
      numbers: [
        {
          value: 200,
          label: 'cidades',
        },
        {
          value: 85,
          label: 'países',
        },
        {
          value: 120000,
          label: 'Estranhos jogaram juntos',
        },
        {
          value: 1000,
          label: 'pontos/gols marcados',
        },
        {
          value: 14000,
          label: 'jogos',
        },
      ],
    },
    faq: {
      title: 'Perguntas Frequentes',
      questions: [
        {
          question: 'Como funciona o sistema de correspondência de habilidades?',
          answer:
            'Nosso sistema de correspondência baseado em IA considera seu nível de experiência, estilo de jogo e preferências para conectá-lo com jogadores de níveis de habilidade semelhantes. Isso garante jogos equilibrados e agradáveis para todos os envolvidos.',
        },
        {
          question: 'O que acontece se eu precisar cancelar um jogo?',
          answer:
            'Você pode cancelar um jogo até 24 horas antes do horário programado sem penalidade. Notificaremos outros jogadores e ajudaremos a encontrar um substituto para garantir que o jogo ainda possa acontecer.',
        },
        {
          question: 'Os locais e equipamentos são fornecidos?',
          answer:
            'Todos os locais são pré-reservados e incluídos na taxa do jogo. Para equipamentos, varia de acordo com o esporte e o local - indicaremos claramente o que é fornecido e o que você precisa trazer nos detalhes do jogo.',
        },
        {
          question: 'Como eu pago pelos jogos?',
          answer:
            'O pagamento é processado com segurança através de nossa plataforma. Você pode pagar por jogo ou optar por um plano de assinatura se jogar regularmente. Aceitamos todos os principais cartões de crédito e métodos de pagamento digital.',
        },
        {
          question: 'Existe um compromisso mínimo necessário?',
          answer:
            'Sem compromisso mínimo! Você pode participar dos jogos com a frequência que desejar. Alguns jogadores participam de jogos regulares semanais, enquanto outros jogam ocasionalmente - é inteiramente você quem decide.',
        },
      ],
    },
    cta2: {
      title: 'Hey Stranger, pronto para arriscar?',
      buttonLabel: 'Escolha seu jogo',
    },
  }

  const homePT = await payload.updateGlobal({
    slug: 'home',
    data: homeDataPT,
    locale: 'pt',
  })

  console.log('✅ 🇵🇹 Home seeded successfully')

  const homeDataEN = {
    hero: {
      title: 'Hey strangers!',
      subtitle: "Let's play together.",
      description: 'Play with friendly strangers—matched to your skills and preferences by AI.',
      buttonLabel: 'Join the fun',
      partners: homePT.hero.partners,
    },
    nextGames: {
      title: 'Next Games',
      games: [
        {
          id: homePT.nextGames.games[0].id!,
          emoji: '⚽',
          sport: 'Soccer',
          location: 'Porto',
          description: '2 Teams of 6 + 2 Subs',
        },
        {
          id: homePT.nextGames.games[1].id!,
          emoji: '🎾',
          sport: 'Padel',
          location: 'Porto',
          description: '2 Teams of 2',
        },
        {
          id: homePT.nextGames.games[2].id!,
          emoji: '🏸',
          sport: 'Tennis',
          location: 'Porto',
          description: '2 Teams of 2',
        },
        {
          id: homePT.nextGames.games[3].id!,
          emoji: '⛳',
          sport: 'Golf',
          location: 'Porto',
          description: '2 Teams of 2',
        },
      ],
    },
    howItWorks: {
      title: 'How the magic happens',
      subtitle: 'Making social sports easy, fun, and friendly.',
      buttonLabel: 'Choose your game',
      steps: [
        {
          id: homePT.howItWorks.steps[0].id!,
          title: 'Take our quick 3-minute skills tests',
          description: 'Your skills help us find the right group for you.',
        },
        {
          id: homePT.howItWorks.steps[1].id!,
          title: 'Choose your game and time',
          description:
            'Browse pre-planned games with set locations and times—just pick what works best for you.',
        },
        {
          id: homePT.howItWorks.steps[2].id!,
          title: 'Show up and say hey strangers',
          description:
            'We handle all the planning. Just show up, meet new friends, play your favorite sports, and enjoy the experience!',
        },
      ],
    },
    stats: {
      title: 'Facts about Hey Strangers',
      statistics: [
        {
          id: homePT.stats.statistics[0].id!,
          label: 'of players',
          description: "say they were perfectly matched with their group's skill level.",
        },
        {
          id: homePT.stats.statistics[1].id!,
          label: 'of participants',
          description: 'would recommend Hey Stranger to their friends.',
        },
        {
          id: homePT.stats.statistics[2].id!,
          label: 'of players',
          description: 'have made lasting connections through our sports activities.',
        },
      ],
    },
    testimonials: {
      title: 'Love letters',
      reviews: [
        {
          id: homePT.testimonials.reviews[0].id!,
          quote:
            "Joining Hey Stranger has been a game-changer! I was nervous about meeting new people, but the matching process was spot on. Now, I have a regular group for soccer, and it's the highlight of my week!",
        },
        {
          id: homePT.testimonials.reviews[1].id!,
          quote:
            "I love how easy it is to find games that fit my schedule. The platform takes all the hassle out of organizing, and I've met some amazing paddle buddies along the way!",
        },
        {
          id: homePT.testimonials.reviews[2].id!,
          quote:
            "As someone new to the city, Hey Stranger made it so easy to connect with people who share my love for tennis. It's like having a ready-made community waiting for you.",
        },
      ],
    },
    cta: {
      title: 'Ready to start playing?',
      subtitle: 'Take our skill test',
      buttonLabel: 'Start Now',
      sports: [
        {
          id: homePT.cta.sports[0].id!,
          name: 'Soccer',
        },
        {
          id: homePT.cta.sports[1].id!,
          name: 'Padel',
        },
        {
          id: homePT.cta.sports[2].id!,
          name: 'Tennis',
        },
        {
          id: homePT.cta.sports[3].id!,
          name: 'Golf',
        },
      ],
    },
    strangers: {
      title: 'Meet some of our strangers',
      strangers: [
        {
          id: homePT.strangers.strangers[0].id!,
          bio: 'A passionate tennis player who loves both competition and casual matches. Always seeking partners to practice on sunny courts.',
          sport: 'Tennis',
        },
        {
          id: homePT.strangers.strangers[1].id!,
          bio: 'A dedicated golf enthusiast known for his great spirit and sharp strokes. Enjoys connecting with other golf fans for pickup games.',
          sport: 'Golf',
        },
        {
          id: homePT.strangers.strangers[2].id!,
          bio: 'An aspiring young padel player who loves honing his skills and learning from teammates. Looks for new challenges.',
          sport: 'Padel',
        },
        {
          id: homePT.strangers.strangers[3].id!,
          bio: 'A dedicated padel player who balances work with her love for the sport. Always up for a competitive yet fun game on the weekends.',
          sport: 'Padel',
        },
      ],
    },
    whenAndWhere: {
      title: 'When & Where',
      subtitle: 'Your perfect game, at the perfect time.',
      buttonLabel: 'Book your game now',
      features: [
        {
          id: homePT.whenAndWhere.features[0].id!,
          title: 'Pre-scheduled games at convenient locations',
          description:
            'We plan everything for you! Games are hosted at top-rated venues, so you always know exactly where to go.',
        },
        {
          id: homePT.whenAndWhere.features[1].id!,
          title: 'Choose the time that works for you',
          description:
            "Our schedule offers a variety of times to fit your day—whether it's a morning tennis match or an evening soccer game, you'll find a slot that suits you.",
        },
        {
          id: homePT.whenAndWhere.features[2].id!,
          title: 'Easy access to all locations',
          description:
            "Each game's location is easily accessible and shared in advance. Whether it's a park, court, or sports facility, you'll get all the details upfront.",
        },
        {
          id: homePT.whenAndWhere.features[3].id!,
          title: 'Flexible options for every schedule',
          description:
            "Can't make a match? No problem—just choose another time or day that works better for you!",
        },
      ],
    },
    numbers: {
      title: 'Hey Strangers in numbers',
      numbers: [
        {
          id: homePT.numbers.numbers[0].id!,
          label: 'cities',
        },
        {
          id: homePT.numbers.numbers[1].id!,
          label: 'countries',
        },
        {
          id: homePT.numbers.numbers[2].id!,
          label: 'Strangers played together',
        },
        {
          id: homePT.numbers.numbers[3].id!,
          label: 'scored points/goals',
        },
        {
          id: homePT.numbers.numbers[4].id!,
          label: 'games',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          id: homePT.faq.questions[0].id!,
          question: 'How does the skill matching system work?',
          answer:
            'Our AI-powered matching system considers your experience level, playing style, and preferences to connect you with players of similar skill levels. This ensures balanced, enjoyable games for everyone involved.',
        },
        {
          id: homePT.faq.questions[1].id!,
          question: 'What happens if I need to cancel a game?',
          answer:
            "You can cancel a game up to 24 hours before the scheduled time without any penalty. We'll notify other players and help find a replacement to ensure the game can still go ahead.",
        },
        {
          id: homePT.faq.questions[2].id!,
          question: 'Are the venues and equipment provided?',
          answer:
            "All venues are pre-booked and included in the game fee. For equipment, it varies by sport and venue - we'll clearly indicate what's provided and what you need to bring in the game details.",
        },
        {
          id: homePT.faq.questions[3].id!,
          question: 'How do I pay for games?',
          answer:
            'Payment is handled securely through our platform. You can pay per game or opt for a membership plan if you play regularly. We accept all major credit cards and digital payment methods.',
        },
        {
          id: homePT.faq.questions[4].id!,
          question: 'Is there a minimum commitment required?',
          answer:
            "No minimum commitment! You can join games as frequently or infrequently as you like. Some players join weekly regular games, while others play occasionally - it's entirely up to you.",
        },
      ],
    },
    cta2: {
      title: 'Hey Stranger, ready to take a chance?',
      buttonLabel: 'Choose your game',
    },
  }

  await payload.updateGlobal({
    slug: 'home',
    data: homeDataEN,
    locale: 'en',
  })

  console.log('✅ 🇬🇧 Home seeded successfully')
}
