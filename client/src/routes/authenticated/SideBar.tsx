import { MessageCircleMoreIcon, PlusIcon, UsersIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { getPersonalChats } from "@/services/chat.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createGroup, updateGroupProfilePic } from "@/services/group.api";

export default function HomeSideBar() {
	return (
		<aside className="fixed bottom-0 z-20 flex justify-around w-full gap-3 p-2 shadow-inner backdrop-blur-lg sm:py-6 sm:px-5 sm:left-0 sm:top-[60px] sm:h-full sm:w-fit sm:flex-col h-fit sm:justify-start gap-y-5">
			<NavLink to={"/home"} className="p-2 rounded-full">
				<MessageCircleMoreIcon />
			</NavLink>

			<CreateGroupDialog />

			<NavLink to={"/home/groups"} className="p-2 rounded-full ">
				<UsersIcon />
			</NavLink>

			<Dialog>
				<DialogTrigger className="hidden text-white sm:block">
					<PlusIcon className="p-2 bg-black rounded-full size-9" />
				</DialogTrigger>
				<DialogDescription></DialogDescription>
				<DialogContent className="flex flex-col gap-3 py-10 bg-opacity-30 max-w-[90%] backdrop-blur-lg rounded w-96">
					<DialogHeader>
						<DialogTitle className="text-center">
							Create Group
						</DialogTitle>
						<Input
							placeholder="Type here..."
							className="focus-visible:ring-0"
						/>
					</DialogHeader>
					<div className="bg-red-100 h-72"></div>
				</DialogContent>
			</Dialog>
		</aside>
	);
}

function CreateGroupDialog() {
	const [name, setName] = useState("");
	const [members, setMembers] = useState<string[]>([]);
	const [url, setUrl] = useState(``);
	const [picFormData, setPicFormData] = useState<FormData>();
	const navigate = useNavigate();

	const { data: chats, isLoading: usersLoading } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			const response = await getPersonalChats();
			return response;
		},
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => {
			const group = await createGroup(name, members);
			if (picFormData) {
				const response = await updateGroupProfilePic(
					group.id,
					picFormData
				);
				return navigate(`/home/groups/${response.id}`);
			}
			return navigate(`/home/groups/${group.id}`);
			console.log({ group });
		},
		mutationKey: ["createGroup"],
	});

	return (
		<Dialog>
			<DialogTrigger className="text-white">
				<PlusIcon className="p-2 bg-black rounded-full size-9" />
			</DialogTrigger>
			<DialogDescription></DialogDescription>
			<DialogContent className="flex flex-col gap-5 py-5  max-w-[90%] dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-background bg-fixed rounded w-96">
				<DialogHeader className="flex flex-col items-center gap-3">
					<DialogTitle className="w-full text-center">
						Create Group
					</DialogTitle>
					<div className="flex flex-col items-center w-full gap-5">
						<Avatar className="bg-cyan-950 size-32">
							<AvatarImage src={url} />
						</Avatar>
						<Input
							type="file"
							accept="image/,.png,.jpg,.jpeg"
							className="dark:bg-gradient-to-tr dark:from-[#805664] dark:to-[#6e3849] bg-background bg-fixed"
							onChange={({ target }) => {
								if (target?.files) {
									const image = target.files[0];

									const x = URL.createObjectURL(image);
									setUrl(x);

									const data = new FormData();
									data.append("picture", image);
									setPicFormData(data);
								}
							}}
						/>
						<label className="flex flex-col w-full gap-1">
							Group Name{" "}
							<Input
								value={name}
								onChange={({ target }) => setName(target.value)}
								className="dark:bg-black/20"
							/>
						</label>
					</div>
				</DialogHeader>

				<div className="flex flex-col gap-2 h-72">
					<p>Add members</p>
					<div className="flex flex-col h-full gap-3 overflow-y-scroll app">
						{usersLoading && (
							<>
								<LoadingSkeleton />
								<LoadingSkeleton />
								<LoadingSkeleton />
							</>
						)}
						{chats &&
							chats.map((chat) => {
								return (
									<UserRow
										key={chat.id}
										user={chat.receiver}
										onClick={(checked: boolean) => {
											if (checked) {
												setMembers(
													members.concat(
														chat.receiver.id
													)
												);
											} else {
												setMembers(
													members.filter(
														(member) =>
															member !==
															chat.receiver.id
													)
												);
											}
										}}
									/>
								);
							})}
					</div>
				</div>

				<Button
					disabled={!name || members.length === 0 || isPending}
					onClick={async () => {
						mutateAsync();
					}}>
					{isPending ? "Creating..." : "Submit"}
				</Button>
			</DialogContent>
		</Dialog>
	);
}

interface UserPropType {
	user: UserType;
	onClick: (checked: boolean) => void;
}

function UserRow({ user, onClick }: UserPropType) {
	const [checked, setChecked] = useState(false);

	return (
		<div
			onClick={() => {
				onClick(!checked);
				setChecked(!checked);
			}}
			className="flex items-center h-16 gap-3 sm:gap-5">
			<Avatar className="bg-blue-300 rounded-full size-12">
				<AvatarImage
					src={
						user?.picture
							? `http://localhost:3001/${user.picture}`
							: ""
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

			<Checkbox
				className="ml-auto size-5"
				checked={checked}
				onClick={() => {
					onClick(!checked);
					setChecked(!checked);
				}}
			/>
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
