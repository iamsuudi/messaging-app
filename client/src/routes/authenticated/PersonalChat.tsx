import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { CheckCheckIcon, ChevronLeft, PhoneIcon, SendIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

<Avatar>
	<AvatarImage src="logo.png" />
	{/* <AvatarFallback>P</AvatarFallback> */}
</Avatar>;

function MyMessage() {
	return (
		<div className="flex flex-wrap gap-2 items-start p-2 ml-auto bg-pink-200 dark:bg-rose-900/40 rounded-2xl rounded-br-none w-fit max-w-[70%]">
			<span className="px-2 tracking-wider">
				justify-between w-20 mt-auto text-xs border
			</span>
			<span className="flex items-end justify-between mt-auto ml-auto text-xs min-w-20">
				12:30 AM <CheckCheckIcon className="opacity-80 size-4" />
			</span>
		</div>
	);
}

function OthersMessage() {
	return (
		<div className="flex flex-wrap gap-2 justify-between items-start p-2 mr-auto bg-gray-200 dark:bg-black/20 rounded-2xl rounded-bl-none w-fit max-w-[70%]">
			<span className="px-2 tracking-wider">
				justify-between w-20 mt-auto text-xs border
			</span>
			<span className="flex items-end justify-between mt-auto ml-auto text-xs min-w-14">
				12:30 AM
			</span>
		</div>
	);
}

export default function PersonalChat() {
	const navigate = useNavigate();

	return (
		<div className="relative flex flex-col w-screen h-screen overflow-hidden dark:bg-gradient-to-tr dark:from-[#09203f] dark:to-[#5c323f] bg-background bg-fixed">
			<nav className="flex items-center justify-between gap-2 px-2 py-3 dark:bg-white/5 backdrop-blur-sm">
				<button onClick={() => navigate(-1)}>
					<ChevronLeft />
				</button>
				<div className="flex font-bold tracking-wide max-w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">
					Abdulfetah Suudi
				</div>
				<button className="mr-2">
					<PhoneIcon fill="blueblack" strokeWidth={0} />
				</button>
			</nav>

			<div className="flex flex-col w-full h-full gap-3 p-3 overflow-scroll app">
				<MyMessage />
				<OthersMessage />
				<MyMessage />
				<OthersMessage />
				<MyMessage />
				<OthersMessage />
				<MyMessage />
				<OthersMessage />
				<MyMessage />
				<OthersMessage />
				<MyMessage />
				<OthersMessage />
				<MyMessage />
				<OthersMessage />
				<MyMessage />
				<OthersMessage />
				<MyMessage />
				<OthersMessage />
			</div>

			<div className="flex items-center gap-2 p-2 overflow-hidden h-fit max-h-20 bg-black/5 dark:bg-white/5">
				<input
					placeholder="Type your message..."
					className="w-full p-2 tracking-wider bg-transparent focus:outline-none app"
				/>
				<Button className="rounded-lg dark:bg-gradient-to-tr dark:from-[#8b5185] dark:to-[#8a3f57] bg-fixed">
					<SendIcon className="" />
				</Button>
			</div>
		</div>
	);
}
