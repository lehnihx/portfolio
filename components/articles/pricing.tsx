import { toast } from "sonner"
import { Button } from "../ui/button"

export const Pricing = () => {
	return (
    <div>
			<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
				Pricing
			</h3>
			<span className="leading-7 not-first:mt-6">
				Every project is unique, Custom Pricing are based on:
			</span>
			<ul className="mb-6 ml-6 list-disc [&>li]:mt-2">
				<li>Project scope</li>
				<li>Features & complexity</li>
				<li>Development time</li>
				<li>Technology stack</li>
				<li>Integrations & AI requirements</li>
			</ul>
			<p className="leading-7 not-first:mt-6">
				Whether you need a website, SaaS, mobile app, desktop application, AI solution, automation, FiveM resource, Discord bot, or a completely custom system, you'll receive a personalized quote based on your requirements.
			</p>
			<Button onClick={() => 
				toast("Not available yet :(")
			}>Get a Custom Quote</Button>
		</div>
	)
}