import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPersonalChats } from "@/services/chat.api";
import { useUserStore } from "@/store";
import { MessageType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import {
	CheckCheckIcon,
	CheckIcon,
	ChevronLeft,
	MessageCircle,
	PhoneIcon,
	SendIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

<Avatar>
	<AvatarImage src="logo.png" />
	{/* <AvatarFallback>P</AvatarFallback> */}
</Avatar>;

type MessagePropType = {
	msg: MessageType;
};

function MyMessage({ msg }: MessagePropType) {
	return (
		<div className="flex flex-wrap gap-2 items-start p-2 ml-auto bg-pink-200 dark:bg-rose-900/40 rounded-2xl rounded-br-none w-fit max-w-[70%]">
			<span className="px-2 tracking-wider">{msg.content}</span>
			<span className="flex items-end justify-between mt-auto ml-auto text-xs min-w-20">
				{format(msg.date, "h:m a..aa")}{" "}
				{msg.seen ? (
					<CheckCheckIcon className="opacity-80 size-4" />
				) : (
					<CheckIcon className="opacity-80 size-4" />
				)}
			</span>
		</div>
	);
}

function OthersMessage({ msg }: MessagePropType) {
	return (
		<div className="flex flex-wrap gap-2 justify-between items-start p-2 mr-auto bg-gray-200 dark:bg-black/20 rounded-2xl rounded-bl-none w-fit max-w-[70%]">
			<span className="px-2 tracking-wider">{msg.content}</span>
			<span className="flex items-end justify-between mt-auto ml-auto text-xs min-w-14">
				{format(msg.date, "h:m a..aa")}
			</span>
		</div>
	);
}

export default function PersonalChat() {
	const user = useUserStore.getState().user;
	const navigate = useNavigate();
	const { chatId } = useParams();

	const {
		data: chats,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			const response = await getPersonalChats();
			console.log({ response });

			return response;
		},
	});

	if (error) {
		console.log(error.message);
		return;
	}

	if (chats) {
		const chat = chats.find((item) => item.id === chatId);
		return (
			<div className="relative flex flex-col w-screen h-screen overflow-hidden dark:bg-gradient-to-tr dark:from-[#09203f] dark:to-[#5c323f] bg-background bg-fixed">
				<nav className="flex items-center justify-between gap-2 px-2 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-sm">
					<button onClick={() => navigate(-1)}>
						<ChevronLeft />
					</button>
					<div className="flex font-bold tracking-wide max-w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">
						{chat?.receiver.name}
					</div>
					<button className="mr-2">
						<PhoneIcon fill="blueblack" strokeWidth={0} />
					</button>
				</nav>

				<div className="flex flex-col w-full h-full gap-3 p-3 overflow-scroll app">
					{isLoading && (
						<>
							<Skeleton className="w-full h-10 max-w-[70%] ml-auto" />
							<Skeleton className="w-full h-10 max-w-[70%] ml-auto" />
							<Skeleton className="w-full h-10 max-w-[70%] mr-auto" />
							<Skeleton className="w-full h-10 max-w-[70%] mr-auto" />
						</>
					)}
					{chats.length > 0 &&
						!isLoading &&
						chat?.messages?.map((msg) => {
							if (msg.sender === user?.id)
								return <MyMessage key={msg.id} msg={msg} />;
							return <OthersMessage key={msg.id} msg={msg} />;
						})}
					{chat?.messages.length === 0 && (
						<div className="flex flex-col items-center justify-center w-full h-full gap-2 opacity-50">
							<MessageCircle className="size-24" strokeWidth={0.5} />
							<p className="text-lg font-medium">
								No Chat History
							</p>
						</div>
					)}
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
}
