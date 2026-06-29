import { Faq } from "@/components/articles/faq"
import { Footer } from "@/components/articles/footer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export const Services = () => {
	return (
		<div className="w-full bg-background h-screen flex justify-center">
			<div className="flex justify-between flex-col items-center h-full w-2/3">
				<div className="flex justify-evenly items-center flex-col h-full w-full">
					<div className="flex flex-col items-center gap-5">
						<h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
							Custom Software Development
						</h1>
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							I build modern software solutions, web applications, APIs, and automation tailored to your needs.
						</p>
						<Button onClick={() => 
							toast("Not available yet :(")
						}>Get in Touch</Button>
					</div>
					<Faq />
				</div>
				<Footer className="w-full" items={[
					{ label: 'Legal', url: '/legal' },
				]} />
			</div>
		</div>
	)
}