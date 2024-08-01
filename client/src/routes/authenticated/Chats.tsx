import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeSideBar from "./SideBar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPersonalChats } from "@/services/chat.api";
import { ChatType, MessageType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FrownIcon } from "lucide-react";
import { compareAsc, format } from "date-fns";
import { useEffect, useState } from "react";
import { socket } from "@/socket";

type ChatPropType = {
	chat: ChatType;
};

function sortMessages(messages: MessageType[]) {
	const sorted =
		messages?.sort((m1, m2) => compareAsc(m1.date, m2.date)) ?? [];
	return sorted;
}

function ChatRow({ chat }: ChatPropType) {
	const { receiver } = chat;
	const [lastMessage, setLastMessage] = useState(
		sortMessages(chat.messages)[chat.messages.length - 1]
	);
	useEffect(() => {
		// setLastMessage();
		socket.on("lastMessage", (msg: MessageType) => {
			if (msg.chatId === chat.id) setLastMessage(msg);
		});
	}, [chat]);

	return (
		<Link
			to={`/home/chats/${chat.id}`}
			className="flex items-center h-20 gap-3 p-3 sm:gap-5">
			<Avatar className="rounded-full size-12">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback></AvatarFallback>
			</Avatar>
			<div className="flex flex-col max-w-[50%]">
				<p className="font-black tracking-[1px] text-md overflow-hidden whitespace-nowrap text-ellipsis opacity-80">
					{receiver
						? receiver.name ?? "No Name Yet"
						: "Deleted Account"}
				</p>
				<p className="max-w-full overflow-hidden text-xs font-bold tracking-tighter opacity-50 whitespace-nowrap text-ellipsis">
					{lastMessage?.content ?? "No chat history"}
				</p>
			</div>
			<div className="flex flex-col items-center gap-1 ml-auto min-w-16">
				<span className="text-xs opacity-80">
					{format(lastMessage?.date ?? new Date(), "h:m a")}
				</span>
				<span className="flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-orange-900/60">
					3
				</span>
			</div>
		</Link>
	);
}

export default function Chats() {
	const [chats, setChats] = useState<ChatType[]>([]);
	const { data, isLoading } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			const response = await getPersonalChats();
			return response;
		},
	});

	useEffect(() => {
		if (data) setChats(data);
	}, [data]);

	useEffect(() => {
		socket.on("newChat", (newChat: ChatType) => {
			setChats(chats.concat(newChat));
		});
	}, [chats]);

	return (
		<div className="relative flex flex-col h-full" id="chatsPage">
			<HomeSideBar />
			{isLoading && (
				<>
					<LoadingSkeleton />
					<LoadingSkeleton />
					<LoadingSkeleton />
					<LoadingSkeleton />
					<LoadingSkeleton />
				</>
			)}

			{!isLoading && chats && chats?.length > 0 ? (
				<div className="flex flex-col py-1 sm:px-5">
					{chats?.map((chat) => {
						return <ChatRow key={chat.id} chat={chat} />;
					})}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center w-full h-full gap-2 py-10 opacity-50">
					<FrownIcon className="size-24" strokeWidth={0.5} />
					<p className="text-lg font-medium">No Chat History</p>
				</div>
			)}
		</div>
	);
}

function LoadingSkeleton() {
	return (
		<div className="flex items-center w-full p-2 pr-5 space-x-4">
			<Skeleton className="rounded-full min-h-14 min-w-14" />
			<div className="w-full space-y-2">
				<Skeleton className="w-full h-5" />
				<Skeleton className="w-full h-5" />
			</div>
		</div>
	);
}
