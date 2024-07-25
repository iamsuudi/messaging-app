import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeSideBar from "./SideBar";

function ChatRow() {
	return (
		<div className="flex items-center h-20 gap-3 p-3 border">
			<Avatar className="rounded-full size-14">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback></AvatarFallback>
			</Avatar>
			<div className="flex flex-col gap-1">
				<p className="font-black tracking-[1px] text-md  h-5 overflow-hidden">
					Abdulfetah Suudi
				</p>
				<p className="h-8 max-w-full overflow-hidden text-xs font-bold tracking-tighter text-gray-800 ">
					Why don't you come home?
				</p>
			</div>
			<div className="flex flex-col items-center gap-1 ml-auto min-w-16">
				<span className="text-xs text-gray-700">2:23 AM</span>
				<span className="flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-rose-300">
					1
				</span>
			</div>
		</div>
	);
}

export default function Chats() {
	return (
		<div className="relative flex flex-col h-fit">
			<HomeSideBar />
			<div className="flex flex-col py-3 sm:px-5">
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
