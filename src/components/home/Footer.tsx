import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { Footer as FooterType } from '@/payload-types'
import SocialIcon from '../common/SocialIcon'

interface FooterProps {
  locale: TypedLocale
}

export default async function Footer({ locale }: FooterProps) {
  const payload = await getPayload({ config })
  const footer = await payload.findGlobal({ slug: 'footer', locale })

  const icons: Record<FooterType['socialLinks'][number]['platform'], React.ReactNode> = {
    facebook: <SocialIcon icon="facebook" />,
    youtube: <SocialIcon icon="youtube" />,
    linkedin: <SocialIcon icon="linkedin" />,
    instagram: <SocialIcon icon="instagram" />,
  }

  return (
    <footer className="bg-[#0B0F12] text-white py-8 w-full">
      <div className="container flex md:flex-row md:justify-between flex-col gap-8">
        <ul className="flex flex-wrap gap-6 justify-center">
          {footer.links.map((link) => (
            <li key={link.id} className="text-center">
              <a href={link.url} className="hover:text-[#E3FFCD] transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 justify-center">
          {footer.socialLinks.map((socialLink) => (
            <a
              key={socialLink.platform}
              href={socialLink.url}
              className="hover:text-[#E3FFCD] transition-colors text-white"
            >
              {icons[socialLink.platform]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
