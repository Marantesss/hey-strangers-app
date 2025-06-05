import { Home } from '@/payload-types'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

interface FAQSectionProps {
  faq: Home['faq']
}

export default function FAQSection({ faq }: FAQSectionProps) {
  return (
    <section className="container space-y-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-4xl font-bold text-center">{faq.title}</h2>
        </div>

        <div className="md:col-span-2">
          <Accordion type="single" collapsible>
            {faq.questions.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border border-[#EBEBEB]"
              >
                <AccordionTrigger className="px-6 data-[state=open]:bg-[#F5F7F9] data-[state=open]:text-primary data-[state=open]:rounded-b-none">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="bg-[#F5F7F9] px-6">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
