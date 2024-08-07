import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Skeleton } from "@/components/ui/skeleton";
import {
	addGroupMember,
	getGroupChat,
	sendGroupMessage,
} from "@/services/group.api";
import { socket } from "@/socket";
import { userErrorStore, useUserStore } from "@/store";
import { GroupMessageType, UserType } from "@/types";
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
	DrawerContent,
	DrawerTrigger,
	Drawer,
	DrawerDescription,
	DrawerTitle,
} from "@/components/ui/drawer";
import { startPersonalChatWithSomeone } from "@/services/chat.api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Contacts from "./contacts";
import HomeNav from "./Nav";

function MyMessage({ msg }: { msg: GroupMessageType }) {
	return (
		<div className="flex flex-wrap gap-1 items-start p-2 ml-auto bg-pink-200 dark:bg-rose-900/40 rounded-2xl rounded-br-none w-fit max-w-[70%]">
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

function OthersMessage({ msg }: { msg: GroupMessageType }) {
	return (
		<div className="flex gap-3 items-start p-2 mr-auto bg-gray-200 dark:bg-black/20 rounded-2xl rounded-tl-none w-fit max-w-[70%]">
			<Avatar className="bg-purple-700 rounded-full size-10">
				<AvatarImage src={msg.sender.picture} />
			</Avatar>
			<div className="flex flex-col items-start gap-1 overflow-hidden">
				<p className="font-black tracking-[1px] text-sm overflow-hidden whitespace-nowrap text-ellipsis">
					{msg.sender
						? msg.sender.name ?? "No Name Yet"
						: "Deleted Account"}
				</p>
				<p className="max-w-full text-sm font-bold tracking-wider opacity-80">
					{msg.content}
				</p>
			</div>
			<span className="flex items-end justify-between mt-auto ml-auto text-xs min-w-14">
				{format(msg.date, "hh:mm a")}
			</span>
		</div>
	);
}

function Messages({ user }: { user: UserType }) {
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

	const { data: group } = useQuery({
		queryKey: ["group", groupId],
		queryFn: async () => {
			const response = await getGroupChat(groupId as string);
			return response;
		},
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});

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

	if (group && user) {
		return (
			<>
				<div className="hidden w-full h-full xl:block pb-14 sm:pl-20 sm:pb-0 pt-[60px]">
					<HomeNav />
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
							<GroupInfo />
						</ResizablePanel>
					</ResizablePanelGroup>
					<HomeSideBar />
				</div>

				<div
					id="personalChatPage"
					className="relative w-full h-full flex flex-col xl:hidden overflow-hidden dark:bg-gradient-to-tr dark:from-[#09203f] dark:to-[#5c323f] bg-background sm:pl-20 pb-1 bg-fixed">
					<nav className="flex items-center justify-between gap-2 px-2 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-sm">
						<button
							onClick={() => navigate("/home/groups")}
							className="xl:invisible">
							<ChevronLeft />
						</button>
						<GroupInfoDrawer>
							<div className="flex overflow-hidden font-bold tracking-wide whitespace-nowrap text-ellipsis">
								{group?.name}
							</div>
						</GroupInfoDrawer>
						<button className="mr-2">
							<PhoneIcon fill="currentColor" strokeWidth={0} />
						</button>
					</nav>

					<Messages user={user} />

					<InputComponent groupId={groupId as string} />

					<div className="hidden sm:block">
						<HomeSideBar />
					</div>
				</div>
			</>
		);
	}
}

function InputComponent({ groupId }: { groupId: string }) {
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

function GroupInfoDrawer({ children }: { children: ReactNode }) {
	return (
		<Drawer>
			<DrawerTrigger>{children}</DrawerTrigger>
			<DrawerContent className="p-5 bg-white dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-fixed backdrop-blur-sm">
				<DrawerTitle></DrawerTitle>
				<DrawerDescription></DrawerDescription>
				<GroupInfo />
			</DrawerContent>
		</Drawer>
	);
}

function UserRow({ user }: { user: UserType }) {
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
			className="flex items-center h-16 max-w-full gap-3 overflow-hidden sm:gap-5 whitespace-nowrap text-ellipsis">
			<Avatar className="bg-green-700 rounded-full size-12">
				<AvatarImage src={user?.picture} />
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

function GroupInfo() {
	const { user } = useUserStore();
	const navigate = useNavigate();
	const { groupId } = useParams();

	const [contactsToAdd, setContactsToAdd] = useState<string[]>([]);
	const [members, setMembers] = useState<UserType[]>([]);
	const [contactsJoined, setContactsJoined] = useState<string[]>([]);

	const { data: group } = useQuery({
		queryKey: ["group", groupId],
		queryFn: async () => {
			const response = await getGroupChat(groupId as string);
			return response;
		},
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});

	const { mutateAsync: add, isPending: isAdding } = useMutation({
		mutationKey: ["addMember", groupId],
		mutationFn: async () => {
			const newMembers = [];
			for await (const contact of contactsToAdd) {
				const response = await addGroupMember(
					groupId as string,
					contact
				);
				newMembers.push(response);
			}
			setMembers(members.concat(newMembers));
			setContactsJoined([
				...contactsJoined,
				...newMembers.map((member) => member.id),
			]);
		},
	});

	useEffect(() => {
		if (group) {
			setContactsJoined(group.users.map((user) => user.id));
			setMembers(group.users);
		}
	}, [group]);

	if (group)
		return (
			<div className="flex flex-col gap-10 p-5">
				<div className="relative flex h-full gap-5">
					<div className="flex flex-col items-center gap-2">
						<Avatar className="rounded-full bg-cyan-700 size-32">
							<AvatarImage src={group?.picture} />
						</Avatar>
						<span className="text-sm opacity-70">
							@{group?.name}
						</span>
					</div>
					<div className="flex flex-col items-start gap-1 p-2">
						<span className="font-bold">{group?.name}</span>
						<span className="text-sm">{group?.bio}</span>
					</div>
					{user?.id === group?.owner?.id && (
						<Button
							className="absolute top-0 right-0 h-8 px-5"
							onClick={() =>
								navigate(`/home/groups/${groupId}/edit`)
							}>
							Edit
						</Button>
					)}
				</div>

				<Tabs defaultValue="members" className="w-full h-80">
					<TabsList className="relative w-full dark:bg-black/15">
						<TabsTrigger value="members" className="font-bold">
							Members
						</TabsTrigger>
						<TabsTrigger value="contacts" className="mr-auto">
							Add from contacts
						</TabsTrigger>
						<Button
							className="absolute right-0 h-8 px-5"
							disabled={isAdding}
							onClick={async () => await add()}>
							{isAdding ? "Adding..." : "Add"}
						</Button>
					</TabsList>
					<TabsContent value="members">
						<div className="flex flex-col h-full gap-3 px-3 overflow-y-scroll app">
							{group &&
								members.map((member) => {
									return (
										<div
											className="flex items-center justify-between"
											key={member.id}>
											<UserRow user={member} />
											{member.id === group?.owner?.id && (
												<span className="text-sm">
													Owner
												</span>
											)}
										</div>
									);
								})}
						</div>
					</TabsContent>
					<TabsContent
						value="contacts"
						className="overflow-y-scroll h-72 app">
						<Contacts
							setMembers={setContactsToAdd}
							members={contactsToAdd}
							hidden={contactsJoined}
						/>
					</TabsContent>
				</Tabs>
			</div>
		);
}
