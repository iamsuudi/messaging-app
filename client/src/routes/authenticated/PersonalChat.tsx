import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	deleteMessage,
	getPersonalChat,
	seeMessage,
	sendMessage,
} from "@/services/chat.api";
import { useUserStore } from "@/store";
import { MessageType, UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { differenceInCalendarMonths, format } from "date-fns";

import {
	CheckCheckIcon,
	CheckIcon,
	ChevronLeft,
	MessageCircle,
	PhoneIcon,
	SendIcon,
} from "lucide-react";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import {
	Fragment,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Chats } from "./Chats";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import HomeSideBar from "./SideBar";
import { socket } from "@/socket";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

type MessagePropType = {
	msg: MessageType;
};

type UserPropType = {
	user: UserType;
};

function MyMessage({ msg }: MessagePropType) {
	const [deleted, setDeleted] = useState(false);
	const { chatId } = useParams();

	if (deleted) return null;

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="flex flex-wrap gap-2 items-start p-2 ml-auto bg-pink-200 dark:bg-rose-900/40 rounded-2xl rounded-br-none w-fit max-w-[70%]">
					<span className="px-2 tracking-wider">{msg.content}</span>
					<span className="flex items-end justify-between mt-auto ml-auto text-xs min-w-20">
						{format(msg.date, "hh:mm a")}{" "}
						{msg.seen ? (
							<CheckCheckIcon className="opacity-80 size-4" />
						) : (
							<CheckIcon className="opacity-80 size-4" />
						)}
					</span>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem
					onClick={async () => {
						try {
							if (chatId) await deleteMessage(chatId, msg.id);
							setDeleted(true);
						} catch (error) {
							// if (axios.isAxiosError(error)) {
							// 	setError(
							// 		error?.response?.data.message ??
							// 			"Something is wrong"
							// 	);
							// }
							// setError("Something is wrong");
						}
					}}>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

function OthersMessage({ msg }: MessagePropType) {
	return (
		<div className="flex flex-wrap gap-2 justify-between items-start p-2 mr-auto bg-gray-200 dark:bg-black/20 rounded-2xl rounded-bl-none w-fit max-w-[70%]">
			<span className="px-2 tracking-wider">{msg.content}</span>
			<span className="flex items-end justify-between mt-auto ml-auto text-xs min-w-14">
				{format(msg.date, "hh:mm a")}
			</span>
		</div>
	);
}

function Messages({ user }: UserPropType) {
	const { chatId } = useParams();
	const ref = useRef<HTMLDivElement>(null);
	const days: string[] = [];
	const [messages, setMessages] = useState<MessageType[]>([]);

	const { data: chat, isLoading } = useQuery({
		queryKey: ["chat", chatId],
		queryFn: async () => {
			const response = await getPersonalChat(chatId as string);
			return response;
		},
	});

	useEffect(() => {
		if (chat) setMessages(chat.messages);
	}, [chat]);

	useEffect(() => {
		const thereIsUnseenMessage = (msg: MessageType) => {
			socket.emit("unSeen", msg);
		};

		const handleIncomingMessage = (msg: MessageType) => {
			if (user.id !== msg.sender) {
				seeMessage(chatId as string, msg.id).catch(() => {});
				msg.seen = true;
			} else {
				thereIsUnseenMessage(msg);
			}
			setMessages(messages.concat(msg));
		};

		const messagesAreSeen = () => {
			setMessages(
				messages.map((message) => {
					if (message.sender === user.id && !message.seen) {
						message.seen = true;
						return message;
					}
					return message;
				})
			);
		};

		const AMessageSeen = (messageId: string) => {
			setMessages(
				messages.map((msg) => {
					if (msg.id === messageId) {
						msg.seen = true;
						return msg;
					}
					return msg;
				})
			);
		};

		const handleDelete = (messageId: string) => {
			setMessages(messages.filter((msg) => msg.id !== messageId));
		};

		socket?.on("message", handleIncomingMessage);

		socket?.on("messagesAreSeen", messagesAreSeen);

		socket?.on("AMessageSeen", AMessageSeen);

		socket?.on("chatMessageDeleted", handleDelete);

		if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;

		return () => {
			socket.off("message", handleIncomingMessage);
			socket.off("messagesAreSeen", messagesAreSeen);
			socket.off("AMessageSeen", AMessageSeen);
			socket?.off("chatMessageDeleted", handleDelete);
		};
	}, [chat, messages, user.id, chatId]);

	return (
		<div
			ref={ref}
			className="flex flex-col w-full h-full gap-3 p-3 overflow-scroll app">
			{isLoading && <LoadingComponent />}

			{messages.map((msg) => {
				return (
					<RenderMessage
						key={msg.id}
						days={days}
						user={user}
						msg={msg}
					/>
				);
			})}

			{messages.length === 0 && !isLoading && <NoChatHistoryComponent />}
		</div>
	);
}

export default function PersonalChat() {
	const user = useUserStore.getState().user;
	const fetchUser = useUserStore.getState().fetchUser;
	const navigate = useNavigate();
	const { chatId } = useParams();

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth2");
			});
		} else {
			//
		}
		socket.emit("joinChat", chatId);
	}, [user, fetchUser, navigate, chatId]);

	const { data: chat } = useQuery({
		queryKey: ["chat", chatId],
		queryFn: async () => {
			const response = await getPersonalChat(chatId as string);

			return response;
		},
	});

	if (chat && user) {
		return (
			<>
				<div className="hidden w-full h-full xl:block pb-14 sm:pl-20 sm:pb-0">
					<ResizablePanelGroup
						direction="horizontal"
						className="flex w-full h-full bg-rose-900/5">
						<ResizablePanel defaultSize={25} className="h-full">
							<div>
								<p className="p-3 text-lg font-bold text-center">
									Personal Chats
								</p>
								<Chats />
							</div>
						</ResizablePanel>
						<ResizableHandle className="hover:cursor-grab" />
						<ResizablePanel defaultSize={50} className="h-full">
							<div
								id="personalChatPage"
								className="relative h-full flex flex-col overflow-hidden dark:bg-gradient-to-tr dark:from-[#09203f] dark:to-[#5c323f] bg-background bg-fixed">
								<nav className="flex items-center justify-between gap-2 px-2 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-sm">
									<button
										onClick={() => navigate("/home")}
										className="">
										<ChevronLeft />
									</button>
									<div className="flex font-bold tracking-wide max-w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">
										{chat?.receiver.name}
									</div>
									<button className="mr-2">
										<PhoneIcon
											fill="currentColor"
											strokeWidth={0}
										/>
									</button>
								</nav>

								<Messages user={user} />

								<InputComponent chatId={chatId as string} />
							</div>
						</ResizablePanel>
						<ResizableHandle className="hover:cursor-grab" />
						<ResizablePanel defaultSize={25} className="h-full">
							<div className="relative flex h-full gap-5 p-5 shadow">
								<div className="flex flex-col items-center gap-2">
									<Avatar className="rounded-full size-32">
										<AvatarImage
											src={chat.receiver?.picture}
										/>
									</Avatar>
									<span className="text-sm opacity-70">
										@{chat.receiver.username}
									</span>
								</div>
								<div className="flex flex-col items-start gap-1 p-2">
									<span className="font-bold">
										{chat.receiver.name}
									</span>
									<span className="mb-3 text-xs">
										{chat.receiver.email}
									</span>
									<span className="text-sm">
										{
											"GET https://registry.npmjs.org/busboy error (ECONNRESET). Will retry in 10 seconds. 2 retries left."
										}
									</span>
								</div>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
					<HomeSideBar />
				</div>
				<div
					id="personalChatPage"
					className="relative w-full h-full flex flex-col xl:hidden overflow-hidden dark:bg-gradient-to-tr dark:from-[#09203f] dark:to-[#5c323f] bg-background sm:pl-20 pb-1 bg-fixed">
					<nav className="flex items-center justify-between gap-2 px-2 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-sm">
						<button
							onClick={() => navigate("/home")}
							className="xl:invisible">
							<ChevronLeft />
						</button>
						<ReceiverComponent user={chat.receiver}>
							<div className="flex overflow-hidden font-bold tracking-wide whitespace-nowrap text-ellipsis">
								{chat?.receiver.name}
							</div>
						</ReceiverComponent>
						<button className="mr-2">
							<PhoneIcon fill="currentColor" strokeWidth={0} />
						</button>
					</nav>

					<Messages user={user} />

					<InputComponent chatId={chatId as string} />
				</div>
			</>
		);
	}
}

type InputComponentProps = {
	chatId: string;
};

function InputComponent({ chatId }: InputComponentProps) {
	const [message, setMessage] = useState("");
	const ref = useRef<HTMLInputElement>(null);

	const onSubmit = useCallback(async () => {
		try {
			await sendMessage(chatId as string, message);
			setMessage("");
			if (ref.current) ref.current.focus();
		} catch (error) {
			console.log("error occurred");
		}
	}, [chatId, message]);

	return (
		<div className="flex items-center gap-2 p-2 overflow-hidden h-fit max-h-20 bg-black/5 dark:bg-white/5">
			<input
				placeholder="Type your message..."
				value={message}
				spellCheck="false"
				ref={ref}
				id="messageInputField"
				onChange={({ target }) => setMessage(target.value)}
				className="w-full p-2 tracking-wider bg-transparent focus:outline-none app"
			/>
			<Button
				type="button"
				disabled={!message}
				onClick={onSubmit}
				className="rounded-lg dark:bg-gradient-to-tr dark:from-[#8b5185] dark:to-[#8a3f57] bg-fixed">
				<SendIcon className="" />
			</Button>
		</div>
	);
}

type RenderMessageProps = {
	days: string[];
	user: UserType;
	msg: MessageType;
};

function RenderMessage({ days, user, msg }: RenderMessageProps) {
	const mine = msg.sender === user?.id;

	const isInThisMonth = differenceInCalendarMonths(msg.date, new Date()) < 1;

	const formattedDate = isInThisMonth
		? format(msg.date, "MMM d")
		: format(msg.date, "y MMM d");

	if (days.includes(formattedDate))
		return mine ? <MyMessage msg={msg} /> : <OthersMessage msg={msg} />;
	else {
		days.push(formattedDate);
		return (
			<Fragment>
				<p className="my-3 text-sm font-medium text-center">
					{formattedDate}
				</p>
				{mine ? <MyMessage msg={msg} /> : <OthersMessage msg={msg} />}
			</Fragment>
		);
	}
}

function LoadingComponent() {
	return (
		<>
			<Skeleton className="w-full h-10 max-w-[70%] ml-auto" />
			<Skeleton className="w-full h-10 max-w-[70%] ml-auto" />
			<Skeleton className="w-full h-10 max-w-[70%] mr-auto" />
			<Skeleton className="w-full h-10 max-w-[70%] mr-auto" />
		</>
	);
}

function NoChatHistoryComponent() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-2 opacity-50">
			<MessageCircle className="size-24" strokeWidth={0.5} />
			<p className="text-lg font-medium">No Chat History</p>
		</div>
	);
}

type ReceiverComponentProps = {
	children: ReactNode;
	user: UserType;
};

function ReceiverComponent({ children, user }: ReceiverComponentProps) {
	return (
		<Drawer>
			<DrawerTrigger>{children}</DrawerTrigger>
			<DrawerContent className="p-5 bg-white dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-background bg-fixed backdrop-blur-sm">
				<DrawerHeader>
					<DrawerTitle className="flex gap-5 mb-5">
						<div className="flex flex-col">
							<Avatar className="rounded-full size-20">
								<AvatarImage src={user?.picture} />
							</Avatar>
							<span className="text-sm opacity-70">
								@{user.username}
							</span>
						</div>
						<div className="flex flex-col items-start gap-2 p-2">
							<span className="">{user.name}</span>
							<span className="text-xs">{user.email}</span>
						</div>
					</DrawerTitle>
					<DrawerDescription>{user.bio}</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<DrawerClose>
						<Button
							variant="outline"
							className="dark:bg-transparent">
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
