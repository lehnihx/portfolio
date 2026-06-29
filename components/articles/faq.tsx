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
					<AccordionTrigger>What do you build?</AccordionTrigger>
					<AccordionContent>
						Custom software tailored to your needs.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="2">
					<AccordionTrigger>How do I get a quote?</AccordionTrigger>
					<AccordionContent>
						Contact me with your project details.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="3">
					<AccordionTrigger>Do you work with international clients?</AccordionTrigger>
					<AccordionContent>
						Yes.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
  )
}
