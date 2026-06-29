import { toast } from "sonner"
import { Button } from "../ui/button"

export const Hero = () => {
	return (
		<div className="flex flex-col items-center gap-5">
			<h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
				Custom Software Solutions
			</h1>
			<p className="leading-7 not-first:mt-6">
				I build modern software solutions, web applications, APIs, and automation tailored to your needs.
			</p>
			<Button onClick={() => 
				toast("Not available yet :(")
			}>Start a Project</Button>
		</div>
	)
}