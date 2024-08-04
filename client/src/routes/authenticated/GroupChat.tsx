import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Skeleton } from "@/components/ui/skeleton";
import { getGroupChat, sendGroupMessage } from "@/services/group.api";
import { socket } from "@/socket";
import { userErrorStore, useUserStore } from "@/store";
import { GroupMessageType, GroupType, UserType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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
	Fragment,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeSideBar from "./SideBar";
import { Button } from "@/components/ui/button";
import { Groups } from "./Groups";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	Drawer,
} from "@/components/ui/drawer";
import { startPersonalChatWithSomeone } from "@/services/chat.api";

type MessagePropType = {
	msg: GroupMessageType;
};

type UserPropType = {
	user: UserType;
};

function MyMessage({ msg }: MessagePropType) {
	return (
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
	const { groupId } = useParams();
	const ref = useRef<HTMLDivElement>(null);
	const days: string[] = [];
	const [messages, setMessages] = useState<GroupMessageType[]>([]);

	const { data: group, isLoading } = useQuery({
		queryKey: ["group", groupId],
		queryFn: async () => {
			const response = await getGroupChat(groupId as string);
			return response;
		},
	});

	useEffect(() => {
		if (group) setMessages(group.messages);
	}, [group]);

	useEffect(() => {
		const handleIncomingMessage = (msg: GroupMessageType) => {
			setMessages(messages.concat(msg));
		};

		socket?.on("groupMessage", handleIncomingMessage);

		if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;

		return () => {
			socket.off("groupMessage", handleIncomingMessage);
		};
	}, [group, messages, user.id, groupId]);

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

			{messages.length === 0 && <NoChatHistoryComponent />}
		</div>
	);
}

export default function GroupChat() {
	const user = useUserStore.getState().user;
	const fetchUser = useUserStore.getState().fetchUser;
	const navigate = useNavigate();
	const { groupId } = useParams();

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth2");
			});
		} else {
			//
		}
		socket.emit("joinChat", groupId);
	}, [user, fetchUser, navigate, groupId]);

	const { data: group } = useQuery({
		queryKey: ["group", groupId],
		queryFn: async () => {
			const response = await getGroupChat(groupId as string);
			console.log({ response });

			return response;
		},
	});

	if (group && user) {
		return (
			<>
				<div className="hidden w-full h-full xl:block pb-14 sm:pl-20 sm:pb-0">
					<ResizablePanelGroup
						direction="horizontal"
						className="flex w-full h-full bg-rose-900/5">
						<ResizablePanel defaultSize={25} className="h-full">
							<div>
								<p className="p-3 text-lg font-bold text-center">
									Group Chats
								</p>
								<Groups />
							</div>
						</ResizablePanel>
						<ResizableHandle className="hover:cursor-grab" />
						<ResizablePanel defaultSize={45} className="h-full">
							<div
								id="personalChatPage"
								className="relative h-full flex flex-col overflow-hidden dark:bg-gradient-to-tr dark:from-[#09203f] dark:to-[#5c323f] bg-background bg-fixed">
								<nav className="flex items-center justify-between gap-2 px-2 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-sm">
									<button
										onClick={() => navigate("/home/groups")}
										className="">
										<ChevronLeft />
									</button>
									<div className="flex font-bold tracking-wide max-w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">
										{group?.name}
									</div>
									<button className="mr-2">
										<PhoneIcon
											fill="currentColor"
											strokeWidth={0}
										/>
									</button>
								</nav>

								<Messages user={user} />

								<InputComponent groupId={groupId as string} />
							</div>
						</ResizablePanel>
						<ResizableHandle className="hover:cursor-grab" />
						<ResizablePanel defaultSize={30} className="h-full">
							<div className="flex flex-col gap-10 p-5">
								<div className="relative flex h-full gap-5">
									<div className="flex flex-col items-center gap-2">
										<Avatar className="rounded-full bg-cyan-700 size-32">
											<AvatarImage
												src={`http://localhost:3001/${group.picture}`}
											/>
										</Avatar>
										<span className="text-sm opacity-70">
											@{group?.name}
										</span>
									</div>
									<div className="flex flex-col items-start gap-1 p-2">
										<span className="font-bold">
											{group?.name}
										</span>
										<span className="mb-3 text-xs">
											{group?.name}
										</span>
										<span className="text-sm">
											{
												"GET https://registry.npmjs.org/busboy error (ECONNRESET). Will retry in 10 seconds. 2 retries left."
											}
										</span>
									</div>
								</div>
								<div className="flex flex-col gap-2 h-72">
									<p className="font-bold">Members</p>
									<div className="flex flex-col h-full gap-3 px-3 overflow-y-scroll app">
										{group &&
											group.users.map((member) => {
												return (
													<div className="flex items-center justify-between">
														<UserRow
															key={member.id}
															user={member}
														/>
														{member.id ===
															group.owner.id && (
															<span className="text-sm">
																Owner
															</span>
														)}
													</div>
												);
											})}
									</div>
								</div>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
					<HomeSideBar />
				</div>
				<div
					id="personalChatPage"
					className="relative w-full h-full flex flex-col xl:hidden overflow-hidden dark:bg-gradient-to-tr dark:from-[#09203f] dark:to-[#5c323f] bg-background pb-14 sm:pl-20 sm:pb-1 bg-fixed">
					<nav className="flex items-center justify-between gap-2 px-2 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-sm">
						<button
							onClick={() => navigate("/home/groups")}
							className="xl:invisible">
							<ChevronLeft />
						</button>
						<GroupInfo group={group}>
							<div className="flex overflow-hidden font-bold tracking-wide whitespace-nowrap text-ellipsis">
								{group?.name}
							</div>
						</GroupInfo>
						<button className="mr-2">
							<PhoneIcon fill="currentColor" strokeWidth={0} />
						</button>
					</nav>

					<Messages user={user} />

					<InputComponent groupId={groupId as string} />

					<HomeSideBar />
				</div>
			</>
		);
	}
}

type InputComponentProps = {
	groupId: string;
};

function InputComponent({ groupId }: InputComponentProps) {
	const [message, setMessage] = useState("");
	const ref = useRef<HTMLInputElement>(null);

	const onSubmit = useCallback(async () => {
		try {
			await sendGroupMessage(groupId as string, message);
			setMessage("");
			if (ref.current) ref.current.focus();
		} catch (error) {
			console.log("error occurred");
		}
	}, [groupId, message]);

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
	msg: GroupMessageType;
};

function RenderMessage({ days, user, msg }: RenderMessageProps) {
	const mine = msg.sender.id === user?.id;

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

type GroupInfoProps = {
	children: ReactNode;
	group: GroupType;
};

function GroupInfo({ children, group }: GroupInfoProps) {
	const { user } = useUserStore();
	const navigate = useNavigate();
	const { groupId } = useParams();

	return (
		<Drawer>
			<DrawerTrigger>{children}</DrawerTrigger>
			<DrawerContent className="p-5 bg-white dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-fixed backdrop-blur-sm">
				<DrawerHeader className="relative">
					<DrawerTitle className="flex gap-5 mb-5">
						<div className="flex flex-col items-center">
							<Avatar className="rounded-full size-20">
								<AvatarImage
									src={`http://localhost:3001/${group.picture}`}
								/>
							</Avatar>
							<span className="text-sm opacity-70">
								@{group.name}
							</span>
						</div>
						<div className="flex flex-col items-start gap-2 p-2">
							<span className="">{group.name}</span>
							<span className="text-xs">{group.bio}</span>
						</div>
					</DrawerTitle>
					{user?.id === group.owner.id && (
						<Button
							className="absolute top-0 right-0 px-5"
							onClick={() =>
								navigate(`/home/groups/${groupId}/edit`)
							}>
							Edit
						</Button>
					)}
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col gap-2 h-72">
					<p className="font-bold">Members</p>
					<div className="flex flex-col h-full gap-3 px-3 overflow-y-scroll app">
						{group &&
							group.users.map((member) => {
								return (
									<div className="flex items-center justify-between">
										<UserRow
											key={member.id}
											user={member}
										/>
										{member.id === group.owner.id && (
											<span className="text-sm">
												Owner
											</span>
										)}
									</div>
								);
							})}
					</div>
				</div>
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

function UserRow({ user }: UserPropType) {
	const me = useUserStore.getState().user;
	const { error, setError, removeError } = userErrorStore((state) => state);

	const navigate = useNavigate();

	const { mutateAsync } = useMutation({
		mutationKey: ["currentChat", user.id],
		mutationFn: async () => {
			try {
				const chatId = await startPersonalChatWithSomeone(user.id);
				if (me?.id === user.id) {
					return navigate("/home/profile");
				}
				return navigate(`/home/chats/${chatId}`);
			} catch (error) {
				setError("Check your internet connection.");
			}
		},
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			removeError();
		}, 3000);

		return () => clearTimeout(timer);
	}, [error, removeError]);

	return (
		<button
			onClick={async () => mutateAsync()}
			className="flex items-center h-16 gap-3 sm:gap-5">
			<Avatar className="rounded-full size-12">
				<AvatarImage
					src={
						user?.picture
							? `http://localhost:3001/${user.picture}`
							: "https://github.com/shadcn.png"
					}
				/>
			</Avatar>
			<div className="flex flex-col gap-0">
				<p className="overflow-hidden font-medium text-md whitespace-nowrap text-ellipsis">
					{user.name ?? "No Name"}
				</p>
				<p className="max-w-full overflow-hidden text-xs font-medium text-start opacity-60 whitespace-nowrap text-ellipsis">
					@{user.username}
				</p>
			</div>
		</button>
	);
}
