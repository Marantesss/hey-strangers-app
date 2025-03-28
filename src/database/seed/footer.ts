import { Payload } from 'payload'
import { Footer } from '@/payload-types'

type SocialPlatform = Footer['socialLinks'][number]['platform']

export const seedFooter = async (payload: Payload) => {
  const footerDataPT = {
    links: [
      {
        label: 'Contacte-nos',
        url: '/contact-us',
      },
      {
        label: 'Dicas de Segurança & Regras',
        url: '/safety',
      },
      {
        label: 'Diretrizes da Comunidade',
        url: '/community-guidelines',
      },
      {
        label: 'Termos & Condições',
        url: '/terms-of-service',
      },
      {
        label: 'Política de Privacidade',
        url: '/privacy-policy',
      },
    ],
    socialLinks: [
      {
        platform: 'facebook' as SocialPlatform,
        url: 'https://www.facebook.com/heystranger.app',
      },
      {
        platform: 'youtube' as SocialPlatform,
        url: 'https://www.youtube.com/@heystranger',
      },
      {
        platform: 'linkedin' as SocialPlatform,
        url: 'https://www.linkedin.com/company/heystranger',
      },
      {
        platform: 'instagram' as SocialPlatform,
        url: 'https://www.instagram.com/heystranger',
      },
    ],
  }

  const footerPT = await payload.updateGlobal({
    slug: 'footer',
    data: footerDataPT,
    locale: 'pt',
  })

  console.log('✅ 🇵🇹 Footer seeded successfully')

  const footerDataEN = {
    links: [
      {
        id: footerPT.links[0].id!,
        label: 'Contact Us',
      },
      {
        id: footerPT.links[1].id!,
        label: 'Safety Tips & Rules',
      },
      {
        id: footerPT.links[2].id!,
        label: 'Community Guidelines',
      },
      {
        id: footerPT.links[3].id!,
        label: 'Terms & Conditions',
      },
      {
        id: footerPT.links[4].id!,
        label: 'Privacy Policy',
      },
    ],
  }

  await payload.updateGlobal({
    slug: 'footer',
    data: footerDataEN,
    locale: 'en',
  })

  console.log('✅ 🇬🇧 Footer seeded successfully')
}
