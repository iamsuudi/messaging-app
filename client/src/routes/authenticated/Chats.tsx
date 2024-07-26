import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeSideBar from "./SideBar";
import { Link } from "react-router-dom";

function ChatRow() {
	return (
		<Link to={'/chats/56'} className="flex items-center h-20 gap-3 p-3 sm:gap-5">
			<Avatar className="rounded-full size-14">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback></AvatarFallback>
			</Avatar>
			<div className="flex flex-col">
				<p className="font-black tracking-[1px] text-md overflow-hidden whitespace-nowrap text-ellipsis">
					Abdulfetah Suudi
				</p>
				<p className="max-w-full overflow-hidden text-xs font-bold tracking-tighter text-gray-800 whitespace-nowrap text-ellipsis">
					Why don't you come home?
				</p>
			</div>
			<div className="flex flex-col items-center gap-1 ml-auto min-w-16">
				<span className="text-xs text-gray-700">2:23 AM</span>
				<span className="flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-rose-300">
					1
				</span>
			</div>
		</Link>
	);
}

export default function Chats() {
	return (
		<div className="relative flex flex-col h-fit">
			<HomeSideBar />
			<div className="flex flex-col py-1 sm:px-5">
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
				<ChatRow />
			</div>
		</div>
	);
}
