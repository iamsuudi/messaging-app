import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomeSideBar from "./SideBar";
import { useUserStore } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupMessageType, GroupType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getGroupChats } from "@/services/group.api";
import { Skeleton } from "@/components/ui/skeleton";
import { FrownIcon } from "lucide-react";
import { socket } from "@/socket";
import { compareAsc, format } from "date-fns";

type GroupPropType = {
	group: GroupType;
};

function sortMessages(messages: GroupMessageType[]) {
	const sorted =
		messages?.sort((m1, m2) => compareAsc(m1.date, m2.date)) ?? [];
	return sorted;
}

function GroupRow({ group }: GroupPropType) {
	const user = useUserStore.getState().user;
	const [lastMessage, setLastMessage] = useState(
		sortMessages(group.messages)[group.messages.length - 1]
	);

	useEffect(() => {
		const changeLastSeen = (msg: GroupMessageType) => {
			if (msg.chatId === group.id) setLastMessage(msg);
		};
		socket.on("lastMessage", changeLastSeen);

		return () => {
			socket.off("lastMessage", changeLastSeen);
		};
	}, [group, user]);

	return (
		<Link
			to={`/home/groups/${group.id}`}
			className="flex items-center w-full h-20 gap-4 p-3 overflow-hidden">
			<Avatar className="rounded-full size-14 bg-sky-700">
				<AvatarImage src={`http://localhost:3001/${group.picture}`} />
				<AvatarFallback></AvatarFallback>
			</Avatar>
			<div className="inline-flex flex-col max-w-[50%]">
				<p className="font-black tracking-[1px] text-md">
					{group.name}
				</p>
				<p className="max-w-full overflow-hidden text-xs font-bold whitespace-nowrap text-ellipsis">
					{lastMessage?.sender?.name && (
						<span className="opacity-90">
							{lastMessage.sender.name}
						</span>
					)}
					{lastMessage && (
						<span className="tracking-tighter opacity-60">
							{lastMessage.content}
						</span>
					)}
					{!lastMessage && (
						<span className="opacity-90">No Chat History</span>
					)}
				</p>
			</div>
			<div className="flex flex-col items-center gap-1 ml-auto min-w-16">
				<span className="text-xs text-gray-700">
					{format(lastMessage?.date ?? new Date(), "h:m a")}
				</span>
			</div>
		</Link>
	);
}

export default function GroupsPage() {
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
		<div className="relative flex flex-col h-full pb-14 sm:pl-20 sm:pb-1">
			<HomeSideBar />
			<Groups />
		</div>
	);
}

export function Groups() {
	const [groups, setGroups] = useState<GroupType[]>([]);
	const { data, isLoading } = useQuery({
		queryKey: ["groups"],
		queryFn: async () => {
			const response = await getGroupChats();
			return response;
		},
	});

	useEffect(() => {
		if (data) setGroups(data);
	}, [data]);

	useEffect(() => {
		const addGroup = (newroup: GroupType) => {
			setGroups(groups.concat(newroup));
		};

		socket.on("newGroup", addGroup);

		return () => {
			socket.off("newGroup", addGroup);
		};
	}, [groups]);

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

			{!isLoading && groups && groups.length > 0 && (
				<div className="flex flex-col py-1 sm:px-5 app">
					{groups?.map((group) => {
						return <GroupRow key={group.id} group={group} />;
					})}
				</div>
			)}

			{!isLoading && groups && groups.length === 0 && (
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
		<div className="flex items-center w-full p-2 pr-5 my-2 space-x-4">
			<Skeleton className="rounded-full min-h-14 min-w-14" />
			<div className="w-full space-y-2">
				<Skeleton className="w-full h-5" />
				<Skeleton className="w-full h-5" />
			</div>
		</div>
	);
}
