import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeSideBar from "./SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { clearChat, deleteChat, getPersonalChats } from "@/services/chat.api";
import { ChatsType, MessageType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FrownIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { useUserStore } from "@/store";
import HomeNav from "./Nav";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

function ChatRow({ chat }: { chat: ChatsType }) {
	const user = useUserStore.getState().user;
	const { receiver } = chat;
	const [lastMessage, setLastMessage] = useState<MessageType | null>(
		chat?.lastMessage
	);
	const [unSeen, setUnSeen] = useState(chat?.unSeen);
	const [deleted, setDeleted] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const addUnSeen = (msg: MessageType) => {
			if (chat.id === msg.chatId && user?.id !== msg.sender)
				setUnSeen(unSeen + 1);
		};
		const changeLastSeen = (msg: MessageType) => {
			if (msg.chatId === chat.id) setLastMessage(msg);
		};
		const handleDelete = (messageId: string) => {
			if (messageId === lastMessage?.id) setLastMessage(null);
		};
		socket.on("addUnSeen", addUnSeen);
		socket.on("lastMessage", changeLastSeen);
		socket.on("chatMessageDeleted", handleDelete);

		return () => {
			socket.off("addUnSeen", addUnSeen);
			socket.off("lastMessage", changeLastSeen);
			socket.off("chatMessageDeleted", handleDelete);
		};
	}, [chat, unSeen, user, lastMessage?.id]);

	if (deleted) return null;

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<Link
					to={`/home/chats/${chat.id}`}
					className="flex items-center h-20 gap-3 p-3 sm:gap-5">
					<Avatar className="bg-purple-700 rounded-full size-12">
						<AvatarImage src={receiver?.picture} />
						<AvatarFallback></AvatarFallback>
					</Avatar>

					<div className="flex flex-col max-w-[50%]">
						<p className="font-black tracking-[1px] text-md overflow-hidden whitespace-nowrap text-ellipsis opacity-80">
							{receiver
								? receiver?.name ?? "No Name Yet"
								: "Deleted Account"}
						</p>
						<p className="max-w-full overflow-hidden text-xs font-bold tracking-tighter opacity-50 whitespace-nowrap text-ellipsis">
							{lastMessage?.content
								? lastMessage.content
								: "...."}
						</p>
					</div>
					<div className="flex flex-col items-center gap-1 ml-auto min-w-16">
						{lastMessage?.date && (
							<span className="text-xs opacity-80">
								{format(lastMessage.date, "hh:mm a")}
							</span>
						)}
						{unSeen !== 0 && (
							<span className="flex items-center justify-center w-5 h-5 p-1 text-[0.6rem] font-medium rounded-full bg-orange-900/60">
								{unSeen}
							</span>
						)}
					</div>
				</Link>
			</ContextMenuTrigger>
			<ContextMenuContent className="dark:bg-gradient-to-tr dark:from-[#703557] dark:to-[#5c323f] bg-background bg-fixed px-2 py-5">
				<ContextMenuItem
					onClick={async () => {
						try {
							await clearChat(chat.id);
							setLastMessage(null);
							navigate("/home");
						} catch (error) {
							//
						}
					}}>
					Clear History
				</ContextMenuItem>
				<ContextMenuItem
					onClick={async () => {
						try {
							await deleteChat(chat.id);
							setDeleted(true);
							navigate("/home");
						} catch (error) {
							//
						}
					}}>
					Delete Chat
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

export function Chats() {
	const { user } = useUserStore();
	const [chats, setChats] = useState<ChatsType[]>([]);
	const { data, isLoading } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			const response = await getPersonalChats();
			return response;
		},
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		staleTime: 0,
	});

	useEffect(() => {
		if (data) setChats(data);
	}, [data]);

	useEffect(() => {
		const addChat = (newChat: ChatsType) => {
			if (newChat?.receiver?.id === user?.id)
				setChats(chats.concat(newChat));
		};

		socket.on("newChat", addChat);

		return () => {
			socket.off("newChat", addChat);
		};
	}, [chats, user?.id]);

	return (
		<div className="flex flex-col h-full" id="chatsPage">
			{isLoading && (
				<>
					<LoadingSkeleton />
					<LoadingSkeleton />
					<LoadingSkeleton />
					<LoadingSkeleton />
					<LoadingSkeleton />
				</>
			)}

			{!isLoading && chats && chats.length > 0 && (
				<div className="flex flex-col py-1 sm:px-5 app">
					{chats?.map((chat) => {
						return <ChatRow key={chat.id} chat={chat} />;
					})}
				</div>
			)}

			{!isLoading && chats && chats.length === 0 && (
				<div className="flex flex-col items-center justify-center w-full h-full gap-2 py-10 opacity-50">
					<FrownIcon className="size-24" strokeWidth={0.5} />
					<p className="text-lg font-medium">No Chat History</p>
				</div>
			)}
		</div>
	);
}

export default function ChatsPage() {
	const { user, fetchUser } = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth2");
			});
		}
	}, [user, fetchUser, navigate]);

	return (
		<div className="h-full pb-14 sm:pl-20 sm:pb-1 pt-[60px]">
			<HomeNav />
			<Chats />
			<HomeSideBar />
		</div>
	);
}

function LoadingSkeleton() {
	return (
		<div className="flex items-center w-full p-2 pr-5 my-2 space-x-4">
			<Skeleton className="rounded-full min-h-14 min-w-14" />
			<div className="w-full space-y-2">
				<Skeleton className="w-full h-5" />
				<Skeleton className="w-full h-5" />
			</div>
		</div>
	);
}
