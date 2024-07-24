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
import { Link } from "react-router-dom";

export default function HomeSideBar() {
	return (
		<aside className="flex justify-around w-full gap-3 p-2 mt-auto ">
			<Link to={""} className="p-2 rounded-full">
				<MessageCircleMoreIcon />
			</Link>

			<DropdownMenu>
				<DropdownMenuTrigger className="outline-none">
					<Button className="flex gap-1 px-8 rounded-full">
						<PlusIcon size={18} />
						New Chat
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

			<Link to={""} className="p-2 rounded-full ">
				<UsersIcon />
			</Link>
		</aside>
	);
}
