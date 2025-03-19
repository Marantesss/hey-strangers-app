import { getFileByPath, Payload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const seedHome = async (payload: Payload) => {
  try {
    await payload.updateGlobal({
      slug: 'home',
      data: {
        hero: {
          title: 'Hey strangers!',
          subtitle: "Let's play together.",
          description: 'Play with friendly strangers—matched to your skills and preferences by AI.',
          buttonLabel: 'Join the fun',
          partners: [
            {
              name: 'SIC',
              logo: await payload.create({
                collection: 'media',
                data: { alt: 'SIC logo' },
                filePath: path.resolve(dirname, 'images/partners/sic.png'),
              }),
            },
            {
              name: 'Time Out',
              logo: await payload.create({
                collection: 'media',
                data: { alt: 'Time Out logo' },
                filePath: path.resolve(dirname, 'images/partners/time-out.png'),
              }),
            },
            {
              name: 'NIT',
              logo: await payload.create({
                collection: 'media',
                data: { alt: 'NIT logo' },
                filePath: path.resolve(dirname, 'images/partners/nit.png'),
              }),
            },
            {
              name: 'Business Insider',
              logo: await payload.create({
                collection: 'media',
                data: { alt: 'Business Insider logo' },
                filePath: path.resolve(dirname, 'images/partners/business-insider.png'),
              }),
            },
          ],
        },
        nextGames: {
          title: 'Next Games',
          sportCategories: [],
        },
        howItWorks: {
          title: 'How the magic happens',
          subtitle: 'Making social sports easy, fun, and friendly.',
          buttonLabel: 'Choose your game',
          steps: [
            {
              icon: await payload.create({
                collection: 'media',
                data: { alt: 'How it works icon' },
                filePath: path.resolve(dirname, 'images/how-icons/quiz.png'),
              }),
              title: 'Take our quick 3-minute skills tests',
              description: 'Your skills help us find the right group for you.',
            },
            {
              icon: await payload.create({
                collection: 'media',
                data: { alt: 'How it works icon' },
                filePath: path.resolve(dirname, 'images/how-icons/schedule.png'),
              }),
              title: 'Choose your game and time',
              description:
                'Browse pre-planned games with set locations and times—just pick what works best for you.',
            },
            {
              icon: await payload.create({
                collection: 'media',
                data: { alt: 'How it works icon' },
                filePath: path.resolve(dirname, 'images/how-icons/show-up.png'),
              }),
              title: 'Show up and say hey strangers',
              description:
                'We handle all the planning. Just show up, meet new friends, play your favorite sports, and enjoy the experience!',
            },
          ],
        },
        stats: {
          title: 'Facts about Hey Strangers',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'Facts about Hey Strangers image' },
            filePath: path.resolve(dirname, 'images/stats/running.jpg'),
          }),
          statistics: [
            {
              value: 95,
              label: 'of players',
              description: "say they were perfectly matched with their group's skill level.",
            },
            {
              value: 82,
              label: 'of participants',
              description: 'would recommend Hey Stranger to their friends.',
            },
            {
              value: 78,
              label: 'of players',
              description: 'have made lasting connections through our sports activities.',
            },
          ],
        },
        testimonials: {
          title: 'Love letters',
          reviews: [
            {
              quote:
                "Joining Hey Stranger has been a game-changer! I was nervous about meeting new people, but the matching process was spot on. Now, I have a regular group for soccer, and it's the highlight of my week!",
              author: 'Alex S.',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Alex S. image' },
                filePath: path.resolve(dirname, 'images/strangers/alex.jpg'),
              }),
            },
            {
              quote:
                "I love how easy it is to find games that fit my schedule. The platform takes all the hassle out of organizing, and I've met some amazing paddle buddies along the way!",
              author: 'Rita M.',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Rita M. image' },
                filePath: path.resolve(dirname, 'images/strangers/rita.jpg'),
              }),
            },
            {
              quote:
                "As someone new to the city, Hey Stranger made it so easy to connect with people who share my love for tennis. It's like having a ready-made community waiting for you.",
              author: 'Sara C.',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Sara C. image' },
                filePath: path.resolve(dirname, 'images/strangers/sara.jpg'),
              }),
            },
          ],
        },
        cta: {
          title: 'Ready to start playing?',
          subtitle: 'Take our skill test',
          buttonLabel: 'Start Now',
          sports: [
            {
              name: 'Soccer',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Soccer image' },
                filePath: path.resolve(dirname, 'images/games/soccer.jpg'),
              }),
              selected: false,
            },
            {
              name: 'Padel',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Padel image' },
                filePath: path.resolve(dirname, 'images/games/padel.jpg'),
              }),
              selected: true,
            },
            {
              name: 'Tennis',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Tennis image' },
                filePath: path.resolve(dirname, 'images/games/tennis.jpg'),
              }),
              selected: false,
            },
            {
              name: 'Golf',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Golf image' },
                filePath: path.resolve(dirname, 'images/games/golf.jpg'),
              }),
              selected: false,
            },
          ],
        },
        strangers: {
          title: 'Meet some of our strangers',
          strangers: [
            {
              name: 'Emma Carter',
              age: 25,
              bio: 'A passionate tennis player who loves both competition and casual matches. Always seeking partners to practice on sunny courts.',
              sport: 'Tennis',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Emma Carter image' },
                filePath: path.resolve(dirname, 'images/strangers/emma.jpg'),
              }),
            },
            {
              name: 'Lucas Martins',
              age: 22,
              bio: 'A dedicated golf enthusiast known for his great spirit and sharp strokes. Enjoys connecting with other golf fans for pickup games.',
              sport: 'Golf',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Lucas Martins image' },
                filePath: path.resolve(dirname, 'images/strangers/lucas.jpg'),
              }),
            },
            {
              name: 'Jake Thompson',
              age: 19,
              bio: 'An aspiring young padel player who loves honing his skills and learning from teammates. Looks for new challenges.',
              sport: 'Padel',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Jake Thompson image' },
                filePath: path.resolve(dirname, 'images/strangers/jake.jpg'),
              }),
            },
            {
              name: 'Logan Brown',
              age: 29,
              bio: 'A padel player who balances work with her love for the sport. Always up for a competitive yet fun game on the weekends.',
              sport: 'Padel',
              image: await payload.create({
                collection: 'media',
                data: { alt: 'Logan Brown image' },
                filePath: path.resolve(dirname, 'images/strangers/logan.jpg'),
              }),
            },
          ],
        },
        whenAndWhere: {
          title: 'When & Where',
          subtitle: 'Your perfect game, at the perfect time.',
          buttonLabel: 'Book your game now',
          image: await payload.create({
            collection: 'media',
            data: { alt: 'When & Where image' },
            filePath: path.resolve(dirname, 'images/games/padel-2.jpg'),
          }),
          features: [
            {
              emoji: '🎾',
              title: 'Pre-scheduled games at convenient locations',
              description:
                'We plan everything for you! Games are hosted at top-rated venues, so you always know exactly where to go.',
            },
            {
              emoji: '⏰',
              title: 'Choose the time that works for you',
              description:
                "Our schedule offers a variety of times to fit your day—whether it's a morning tennis match or an evening soccer game, you'll find a slot that suits you.",
            },
            {
              emoji: '📍',
              title: 'Easy access to all locations',
              description:
                "Each game's location is easily accessible and shared in advance. Whether it's a park, court, or sports facility, you'll get all the details upfront.",
            },
            {
              emoji: '📅',
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
              value: 200,
              label: 'cities',
            },
            {
              value: 85,
              label: 'countries',
            },
            {
              value: 120000,
              label: 'Strangers played together',
            },
            {
              value: 1000,
              label: 'scored points/goals',
            },
            {
              value: 14000,
              label: 'games',
            },
          ],
        },
        faq: {
          title: 'Frequently Asked Questions',
          questions: [
            {
              question: 'How does the skill matching system work?',
              answer:
                'Our AI-powered matching system considers your experience level, playing style, and preferences to connect you with players of similar skill levels. This ensures balanced, enjoyable games for everyone involved.',
            },
            {
              question: 'What happens if I need to cancel a game?',
              answer:
                "You can cancel a game up to 24 hours before the scheduled time without any penalty. We'll notify other players and help find a replacement to ensure the game can still go ahead.",
            },
            {
              question: 'Are the venues and equipment provided?',
              answer:
                "All venues are pre-booked and included in the game fee. For equipment, it varies by sport and venue - we'll clearly indicate what's provided and what you need to bring in the game details.",
            },
            {
              question: 'How do I pay for games?',
              answer:
                'Payment is handled securely through our platform. You can pay per game or opt for a membership plan if you play regularly. We accept all major credit cards and digital payment methods.',
            },
            {
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
        footer: {
          links: [
            {
              label: 'Contact Us',
              url: '/contact',
            },
            {
              label: 'Safety Tips & Rules',
              url: '/safety',
            },
            {
              label: 'Community Guidelines',
              url: '/community',
            },
            {
              label: 'Terms & Conditions',
              url: '/terms',
            },
            {
              label: 'Privacy Policy',
              url: '/privacy',
            },
          ],
          socialLinks: [
            {
              platform: 'Facebook',
              url: 'https://www.facebook.com/heystranger.app',
            },
            {
              platform: 'YouTube',
              url: 'https://www.youtube.com/@heystranger',
            },
            {
              platform: 'LinkedIn',
              url: 'https://www.linkedin.com/company/heystranger',
            },
            {
              platform: 'Instagram',
              url: 'https://www.instagram.com/heystranger',
            },
          ],
        },
      },
    })
    console.log('✅ Home seeded successfully')
  } catch (error) {
    console.error('Error seeding home:', error)
  }
}
