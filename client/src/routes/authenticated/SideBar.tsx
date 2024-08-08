import {
	Group,
	MessageCircleMoreIcon,
	PlusIcon,
	User,
	UsersIcon,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HomeSideBar() {
	return (
		<aside className="fixed bottom-0 z-20 flex justify-around items-center w-full gap-3 p-2 shadow-inner backdrop-blur-lg sm:py-6 sm:px-5 sm:left-0 sm:top-[60px] sm:h-full sm:w-fit sm:flex-col h-fit sm:justify-start gap-y-5">
			<NavLink to={"/home"} className="p-2 rounded-full">
				<MessageCircleMoreIcon />
			</NavLink>

			<div className="block sm:hidden">
				<CreateGroupDialog />
			</div>

			<NavLink to={"/home/groups"} className="p-2 rounded-full ">
				<UsersIcon />
			</NavLink>

			<div className="hidden sm:block">
				<CreateGroupDialog />
			</div>
		</aside>
	);
}

function CreateGroupDialog() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="text-white dark:text-black">
				<PlusIcon className="p-2 bg-black rounded-full dark:bg-white size-8" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="flex flex-col gap-5 py-5  max-w-[90%] dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-background bg-fixed rounded w-52">
				<DropdownMenuItem>
					<Link to={'/home/chats/add'} className="flex items-center">
						<User className="w-4 h-4 mr-2" />
						Add New Contact
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link to={"/home/groups/create"} className="flex items-center">
						<Group className="w-4 h-4 mr-2" />
						Create Group
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
