import { Faq } from "@/components/articles/faq"
import { Footer } from "@/components/articles/footer"

export const Services = () => {
	return (
		<div className="w-full bg-background h-screen flex justify-center">
			<div className="flex justify-between flex-col items-center h-full w-2/3">
				<div className="flex justify-evenly items-center flex-col h-full w-full">
					<h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Services</h1>
					<Faq />
				</div>
				<Footer className="w-full" items={[
					{ label: 'Legal', url: '/legal' },
				]} />
			</div>
		</div>
	)
}