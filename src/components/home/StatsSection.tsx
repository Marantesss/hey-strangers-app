import Image from 'next/image'
import { Home, Media } from '@/payload-types'

interface StatsSectionProps {
  stats: Home['stats']
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold">{stats.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.statistics.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 p-6 border rounded-2xl">
                <p className="text-4xl font-bold text-[#1BA781]">{item.value}%</p>
                <p className="">{item.label}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden min-h-[300px]">
          <Image
            src={(stats.image as Media).url!}
            alt={(stats.image as Media).alt!}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
