import { MessageCircleMoreIcon, PlusIcon, UsersIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function HomeSideBar() {
	return (
		<aside className="fixed bottom-0 z-20 flex justify-around w-full gap-3 p-2 bg-white shadow-sm sm:py-16 sm:px-5 sm:left-0 sm:top-14 sm:h-full sm:w-fit sm:flex-col h-fit sm:justify-start gap-y-5">
			<NavLink to={"/home"} className="p-2 rounded-full">
				<MessageCircleMoreIcon />
			</NavLink>

			<Dialog>
				<DialogTrigger className="text-white sm:hidden">
					<PlusIcon className="p-2 bg-black rounded-full size-9" />
				</DialogTrigger>
				<DialogContent className="flex flex-col gap-3 py-10 bg-opacity-30 max-w-[90%] backdrop-blur-lg rounded w-96">
					<DialogHeader>
						<DialogTitle className="text-center">
							Create Group
						</DialogTitle>
						<Input
							placeholder="Type here..."
							className="focus-visible:ring-0"
						/>
					</DialogHeader>
					<div className="bg-red-100 h-72"></div>
				</DialogContent>
			</Dialog>

			<NavLink to={"/home/groups"} className="p-2 rounded-full ">
				<UsersIcon />
			</NavLink>

			<Dialog>
				<DialogTrigger className="hidden text-white sm:block">
					<PlusIcon className="p-2 bg-black rounded-full size-9" />
				</DialogTrigger>
				<DialogContent className="flex flex-col gap-3 py-10 bg-opacity-30 max-w-[90%] backdrop-blur-lg rounded w-96">
					<DialogHeader>
						<DialogTitle className="text-center">
							Create Group
						</DialogTitle>
						<Input
							placeholder="Type here..."
							className="focus-visible:ring-0"
						/>
					</DialogHeader>
					<div className="bg-red-100 h-72"></div>
				</DialogContent>
			</Dialog>
		</aside>
	);
}
