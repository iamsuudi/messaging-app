import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircleMoreIcon, PlusIcon, UsersIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function HomeSideBar() {
	return (
		<aside className="fixed bottom-0 z-20 flex justify-around w-full gap-3 p-2 bg-white shadow-sm sm:py-16 sm:px-5 sm:left-0 sm:top-14 sm:h-full sm:w-fit sm:flex-col h-fit sm:justify-start gap-y-5">
			<NavLink to={"/home"} className="p-2 rounded-full">
				<MessageCircleMoreIcon />
			</NavLink>

			<DropdownMenu>
				<DropdownMenuTrigger className="outline-none sm:hidden">
					<Button className="flex gap-1 px-8 rounded-full">
						<PlusIcon size={18} />
						<span className="">New Chat</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuItem>Subscription</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<NavLink to={"/home/groups"} className="p-2 rounded-full ">
				<UsersIcon />
			</NavLink>

			<DropdownMenu>
				<DropdownMenuTrigger className="hidden outline-none sm:block">
					<button className="text-white">
						<PlusIcon className="p-2 bg-black rounded-full size-9" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuItem>Subscription</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</aside>
	);
}
