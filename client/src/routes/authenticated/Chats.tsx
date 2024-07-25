import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeSideBar from "./SideBar";

function ChatRow() {
	return (
		<div className="flex items-center gap-4 p-3 ">
			<Avatar className="rounded-full size-14">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback></AvatarFallback>
			</Avatar>
			<div className="flex flex-col">
				<p className="font-black tracking-[1px] text-md">
					Abdulfetah Suudi
				</p>
				<p className="text-xs font-bold tracking-tighter text-gray-800">
					Why don't you come home?
				</p>
			</div>
			<div className="flex flex-col items-center gap-1 ml-auto">
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
		<div className="h-[200vh] py-0 relative bg-rose-100">
			<HomeSideBar />
			<h2 className="sticky z-20 py-3 mb-5 text-xl font-bold text-center bg-white top-12">
				Chats
			</h2>
			<div className="sm:px-5">
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
