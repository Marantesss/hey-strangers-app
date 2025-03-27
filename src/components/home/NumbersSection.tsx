import { Home } from '@/payload-types'

interface NumbersSectionProps {
  numbers: Home['numbers']
}

export default function NumbersSection({ numbers }: NumbersSectionProps) {
  return (
    <section className="container space-y-20 py-20">
      <h2 className="text-4xl font-bold text-center">{numbers.title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-8">
        {/* Cities */}
        <div className="bg-primary p-12 flex flex-col gap-6 justify-end text-white md:col-span-2 md:row-span-2">
          <p className="text-5xl font-bold">{numbers.numbers[0].value}</p>
          <p className="text-lg font-medium">{numbers.numbers[0].label}</p>
        </div>

        <div className="bg-[#F5F7F9] p-12 flex flex-col justify-between items-end md:col-span-3 rounded-bl-[16rem] aspect-square">
          <p className="text-5xl font-bold text-primary">{numbers.numbers[1].value}</p>
          <p className="text-lg text-primary">{numbers.numbers[1].label}</p>
        </div>

        <div className="bg-[#E3FFCD] p-12 flex flex-col justify-between items-end md:col-span-3 aspect-square rounded-l-[16rem]">
          <p className="text-5xl font-bold text-primary">{numbers.numbers[2].value}</p>
          <p className="text-lg text-primary">{numbers.numbers[2].label}</p>
        </div>

        <div className="bg-[#F5F7F9] p-12 flex flex-col justify-between items-start md:col-span-3 rounded-tr-[16rem] aspect-square">
          <p className="text-5xl font-bold text-primary">{numbers.numbers[3].value}</p>
          <p className="text-lg text-primary">{numbers.numbers[3].label}</p>
        </div>

        <div className="bg-primary p-12 flex flex-col justify-between items-start text-[#E3FFCD] md:col-span-3 aspect-square rounded-[4rem]">
          <p className="text-5xl font-bold">{numbers.numbers[4].value}</p>
          <p className="text-lg">{numbers.numbers[4].label}</p>
        </div>
      </div>
    </section>
  )
}
