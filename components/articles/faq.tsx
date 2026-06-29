import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq() {
  return (
    <div className="flex flex-col gap-2">
			<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
				FAQ
			</h3>
			<Accordion
				type="single"
				collapsible
				defaultValue="1"
			>
				<AccordionItem value="1">
					<AccordionTrigger>Do you work with international clients?</AccordionTrigger>
					<AccordionContent>
						Yes. I'm based in Algeria and I use Paddle to process the payment as a middlware between us
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
  )
}
