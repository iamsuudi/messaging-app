import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPersonalChat, sendMessage } from "@/services/chat.api";
// import { socket } from "@/socket.io";
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

import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type MessagePropType = {
	msg: MessageType;
};

type UserPropType = {
	user: UserType;
};

function MyMessage({ msg }: MessagePropType) {
	return (
		<div className="flex flex-wrap gap-2 items-start p-2 ml-auto bg-pink-200 dark:bg-rose-900/40 rounded-2xl rounded-br-none w-fit max-w-[70%]">
			<span className="px-2 tracking-wider">{msg.content}</span>
			<span className="flex items-end justify-between mt-auto ml-auto text-xs min-w-20">
				{format(msg.date, "h:m a")}{" "}
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
				{format(msg.date, "h:m a")}
			</span>
		</div>
	);
}

export default function PersonalChat() {
	const user = useUserStore.getState().user;
	const fetchUser = useUserStore.getState().fetchUser;
	const navigate = useNavigate();
	const { chatId } = useParams();

	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth2");
			});
		}
	}, [user, fetchUser, navigate]);

	const { data: chat, error } = useQuery({
		queryKey: ["chat"],
		queryFn: async () => {
			const response = await getPersonalChat(chatId as string);

			return response;
		},
	});

	const onSubmit = async () => {
		try {
			const response = await sendMessage(chatId as string, message);
			console.log({ response });
			setMessage("");
		} catch (error) {
			console.log("error occurred");
		}
	};

	if (error) {
		console.log(error.message);
		return;
	}

	if (chat && user) {
		return (
			<ThemeProvider>
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

					<RenderMessages user={user} />

					<div className="flex items-center gap-2 p-2 overflow-hidden h-fit max-h-20 bg-black/5 dark:bg-white/5">
						<input
							placeholder="Type your message..."
							value={message}
							spellCheck="false"
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
				</div>
			</ThemeProvider>
		);
	}
}

function RenderMessages({ user }: UserPropType) {
	const { chatId } = useParams();
	const days: string[] = [];

	const { data: chat, isLoading } = useQuery({
		queryKey: ["chat"],
		queryFn: async () => {
			const response = await getPersonalChat(chatId as string);
			return response;
		},
	});

	return (
		<div className="flex flex-col w-full h-full gap-3 p-3 overflow-scroll app">
			{isLoading && <LoadingComponent />}

			{chat?.messages?.map((msg) => {
				const mine = msg.sender === user?.id;

				const isInThisMonth =
					differenceInCalendarMonths(msg.date, new Date()) < 1;

				const formattedDate = isInThisMonth
					? format(msg.date, "MMM d")
					: format(msg.date, "y MMM d");

				if (days.includes(formattedDate))
					return mine ? (
						<MyMessage key={msg.id} msg={msg} />
					) : (
						<OthersMessage key={msg.id} msg={msg} />
					);
				else {
					days.push(formattedDate);
					return (
						<Fragment key={msg.id}>
							<p className="my-3 text-sm font-medium text-center">
								{formattedDate}
							</p>
							{mine ? (
								<MyMessage msg={msg} />
							) : (
								<OthersMessage msg={msg} />
							)}
						</Fragment>
					);
				}
			})}

			{chat?.messages.length === 0 && <NoChatHistoryComponent />}
		</div>
	);
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
