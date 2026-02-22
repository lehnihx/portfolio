"use client"

import { HoverCard } from "radix-ui";
import type { ReactNode } from "react";
import { Badge } from "./ui/badge";
import Image from "next/image"
import { Verified } from "lucide-react";
import { Tooltip } from "./tooltip";
import { Review } from "@/app/[lang]/page";

const HoverCardDemo = ({ review, children, openDelay }: { review: Review, children: ReactNode, openDelay?: number }) => {
	if (!review) return
	const { name, username, avatar, banner, color, locale, verified, avatar_decoration, tag, badge } = review
	return (
		<HoverCard.Root openDelay={openDelay}>
			<HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
			<HoverCard.Portal>
				<HoverCard.Content
					className="w-75 rounded-md bg-background shadow-[hsl(206_22%_7%/35%)_0px_10px_38px_-10px,hsl(206_22%_7%/20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
					style={{ backgroundColor: color ? `${color}` : undefined }}
					sideOffset={5}
				>
					<div className="flex flex-col gap-1.75">
						<div
							className="relative h-20 z-2 rounded-tl-md rounded-tr-md"
							style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
						>
							<div className="absolute ml-5 -bottom-5 overflow-visible size-18">
								<Image
									className="outline-2 h-[80%] w-[80%] absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
									src={avatar}
									alt={name}
									width={100}
									height={100}
								/>
								{avatar_decoration && (
									<Image
										className="pointer-events-none absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 object-contain"										src={avatar_decoration}
										alt={`${name} decoration`}
										width={100}
										height={100}
									/>
								)}
							</div>
							{locale && <Badge
								variant="outline"
								className="absolute right-1.5 top-1.5"
							>
								{locale}
							</Badge>}
						</div>
						<div className="flex flex-col gap-3.75 p-5">
							<div className="flex ">
								<div className="m-0 text-[15px] font-medium text-mauve12">
									{name}
									{verified && <Tooltip tooltip="This user has verified his email">
										<Badge variant="outline">
											<Verified/>
										</Badge>
									</Tooltip>}
								</div>
							</div>
							<div className="flex gap-2">
								<div className="m-0 text-[15px] text-mauve10 underline">{username}</div>
								{(badge && tag) &&  <Badge variant="secondary">
									<Image src={badge} alt={username} width={20} height={20}/>{tag}
								</Badge>}
							</div>
						</div>
					</div>
					<HoverCard.Arrow className="fill-white" />
				</HoverCard.Content>
			</HoverCard.Portal>
		</HoverCard.Root>
	)
}

export default HoverCardDemo;
