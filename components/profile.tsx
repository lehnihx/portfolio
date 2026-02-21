import { HoverCard } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";

type HoverProfileCardProps = ComponentProps<typeof HoverCard.Root> & {
  children: ReactNode
  profile: string
  name: string
  username: string
  stars: number
}

const HoverCardDemo = ({
	children, profile, name, username, stars, ...args
}: HoverProfileCardProps) => (
	<HoverCard.Root {...args}>
		<HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
		<HoverCard.Portal>
			<HoverCard.Content
				className="w-[300px] rounded-md bg-background p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
				sideOffset={5}
			>
				<div className="flex flex-col gap-[7px]">
					<img
						className="block size-[60px] rounded-full"
						src={profile}
						alt={name}
					/>
					<div className="flex flex-col gap-[15px]">
						<div>
							<div className="m-0 text-[15px] font-medium text-mauve12">
								{name}
							</div>
							<div className="m-0 text-[15px] text-mauve10">{username}</div>
						</div>
					</div>
				</div>

				<HoverCard.Arrow className="fill-white" />
			</HoverCard.Content>
		</HoverCard.Portal>
	</HoverCard.Root>
);

export default HoverCardDemo;
