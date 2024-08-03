import { GroupMessageType } from "@/types";
import { format } from "date-fns";
import { CheckCheckIcon, CheckIcon } from "lucide-react";

type MessagePropType = {
	msg: GroupMessageType;
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
	const { chatId } = useParams();
	const ref = useRef<HTMLDivElement>(null);
	const days: string[] = [];
	const [messages, setMessages] = useState<GroupMessageType[]>([]);

	const { data: chat, isLoading } = useQuery({
		queryKey: ["chat"],
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

		socket?.on("message", handleIncomingMessage);

		socket?.on("messagesAreSeen", messagesAreSeen);

		socket?.on("AMessageSeen", AMessageSeen);

		if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;

		return () => {
			socket.off("message", handleIncomingMessage);
			socket.off("messagesAreSeen", messagesAreSeen);
			socket.off("AMessageSeen", AMessageSeen);
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

			{messages.length === 0 && <NoChatHistoryComponent />}
		</div>
	);
}