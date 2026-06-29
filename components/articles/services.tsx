import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function ServicesDescription() {
  return (
    <div className="flex flex-col gap-2">
			<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
				Services
			</h3>
			<Tabs defaultValue="1" className="w-full">
				<TabsList>
					<TabsTrigger value="1">FiveM</TabsTrigger>
					<TabsTrigger value="2">Web</TabsTrigger>
					<TabsTrigger value="3">Mobile</TabsTrigger>
					<TabsTrigger value="4">AI</TabsTrigger>
					<TabsTrigger value="5">Tools</TabsTrigger>
				</TabsList>
				<TabsContent value="1">
					<Card>
						<CardHeader>
							<CardTitle>FiveM Server Developement</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Tailored scripting solutions for your server
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="2">
					<Card>
						<CardHeader>
							<CardTitle>Web Applications</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Modern, responsive websites, web applications, dashboards, and SaaS platforms.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="3">
					<Card>
						<CardHeader>
							<CardTitle>Mobile & Desktop Applications</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Cross-platform mobile apps and desktop software built for performance and reliability.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="4">
					<Card>
						<CardHeader>
							<CardTitle>AI & Intelligent Automation</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							AI-powered applications, agentic workflows, automation systems, and intelligent integrations.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="5">
					<Card>
						<CardHeader>
							<CardTitle>Developer Experience</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Developement tools, extensions, discord bots/apps
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
  )
}
