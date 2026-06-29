import { Faq } from "@/components/articles/faq"
import { Footer } from "@/components/articles/footer"
import { Hero } from "@/components/articles/hero"
import { ServicesDescription } from "@/components/articles/services"

export const Services = () => {
	return (
		<div className="w-full bg-background h-screen flex justify-center">
			<div className="flex justify-between flex-col items-center h-full w-2/3">
				<div className="flex justify-evenly items-center flex-col h-full w-full">
					<Hero />
					<ServicesDescription />
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