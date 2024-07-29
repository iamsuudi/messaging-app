import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeSideBar from "./SideBar";

function GroupRow() {
	return (
		<div className="flex items-center w-full h-20 gap-4 p-3 overflow-hidden">
			<Avatar className="rounded-full size-14">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback></AvatarFallback>
			</Avatar>
			<div className="inline-flex flex-col max-w-[50%]">
				<p className="font-black tracking-[1px] text-md">CodeNight</p>
				<p className="max-w-full overflow-hidden text-xs font-bold whitespace-nowrap text-ellipsis">
					<span className="opacity-90"> Abdulfetah Suudi</span>
					{" : "}
					<span className="tracking-tighter opacity-60">
						Why don't you come home?
					</span>
				</p>
			</div>
			<div className="flex flex-col items-center gap-1 ml-auto min-w-16">
				<span className="text-xs text-gray-700">2:23 AM</span>
				<span className="flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-orange-900/60">
					1
				</span>
			</div>
		</div>
	);
}

export default function Groups() {
	return (
		<div className="relative flex flex-col h-fit">
			<HomeSideBar />
			<div className="flex flex-col py-1 sm:px-5 app">
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
				<GroupRow />
			</div>
		</div>
	);
}
