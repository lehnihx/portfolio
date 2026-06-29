import { Faq } from "@/components/articles/faq"
import { Footer } from "@/components/articles/footer"
import { Hero } from "@/components/articles/hero"
import { Pricing } from "@/components/articles/pricing"
import { ServicesDescription } from "@/components/articles/services"

export const Services = () => {
	return (
		<div className="w-full bg-background flex justify-center">
			<div className="flex justify-between flex-col h-full w-2/3">
				<div className="flex justify-center flex-col min-h-screen w-full">
					<Hero />
				</div>
				<div className="flex justify-evenly flex-col min-h-screen w-full">
					<ServicesDescription />
					<Pricing />
					<Faq />
				</div>
				<Footer className="w-full" items={[
					{ label: 'Legal', url: '/legal', replace: true },
					{ label: 'Contact', url: '/contact', replace: true }
				]} />
			</div>
		</div>
	)
}