import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { startPersonalChatWithSomeone } from "@/services/chat.api";
import {
	getGroupChat,
	removeGroupMember,
	updateGroup,
	updateGroupProfilePic,
} from "@/services/group.api";
import { userErrorStore, useUserStore } from "@/store";
import { UserType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AlertCircle, ArrowBigLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGroup() {
	const navigate = useNavigate();
	const { fetchUser, user } = useUserStore((state) => state);
	const { error, setError, removeError } = userErrorStore((state) => state);
	const [url, setUrl] = useState("");
	const [picFormData, setPicFormData] = useState<FormData>();
	const { groupId } = useParams();
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [members, setMembers] = useState<UserType[]>([]);

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth2");
			});
		} else {
			//
		}

		const timer = setTimeout(() => {
			removeError();
		}, 3000);

		return () => clearTimeout(timer);
	}, [user, fetchUser, navigate, removeError, error]);

	const { data: group } = useQuery({
		queryKey: ["group", groupId],
		queryFn: async () => {
			const response = await getGroupChat(groupId as string);
			setName(response.name);
			setBio(response.bio);
			return response;
		},
	});

	useEffect(() => {
		if (group) {
			setMembers(group.users);
			setUrl(`http://localhost:3001/${group.picture}`);
		}
	}, [group]);

	const { mutateAsync: update, isPending: isUpdating } = useMutation({
		mutationKey: ["editGroup", groupId],
		mutationFn: async () => {
			try {
				await updateGroup(groupId as string, name, bio);
				if (picFormData) {
					await updateGroupProfilePic(groupId as string, picFormData);
				}
			} catch (error) {
				const e = error as AxiosError;
				setError(e.response?.data.message ?? e.message);
			}
		},
	});

	const { mutateAsync: remove, isPending: isRemoving } = useMutation({
		mutationKey: ["removeMember", groupId],
		mutationFn: async (userId: string) => {
			if (groupId) await removeGroupMember(groupId, userId);
			setMembers(members.filter((member) => member.id !== userId));
		},
	});

	return (
		<div className="h-full app">
			<div className="relative flex flex-col items-center w-screen max-w-md gap-5 px-5 py-20 mx-auto h-fit">
				{error && (
					<div className="fixed z-10 w-full px-5 max-w-96 h-fit top-24">
						<Alert
							variant="destructive"
							className="w-full font-bold bg-gray-50">
							<AlertCircle className="w-4 h-4" />
							<AlertTitle className="font-bold">Error</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					</div>
				)}

				<ArrowBigLeft
					className="absolute left-0 rounded-full top-20 hover:cursor-pointer dark:bg-black/5"
					onClick={() => navigate(`/home/groups/${groupId}`)}
				/>

				<h1 className="text-2xl font-bold">Edit Group</h1>

				<form className="flex flex-col items-center w-full max-w-md gap-3 px-10 py-2">
					<Avatar className="bg-rose-300 size-32">
						<AvatarImage src={url} />
					</Avatar>
					<Input
						type="file"
						name="picture"
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
						accept="image/,.jpg,.png,.jpeg"
						className="bg-transparent dark:border-none hover:bg-black/5 hover:cursor-pointer dark:bg-white/5"
					/>
				</form>

				<div className="flex flex-col w-full gap-3">
					<label>
						Name{" "}
						<Input
							value={name}
							onChange={({ target }) => setName(target.value)}
							className="dark:bg-white/5"
						/>
					</label>
					<label>
						Bio{" "}
						<Textarea
							value={bio}
							onChange={({ target }) => setBio(target.value)}
							className="dark:bg-white/5"
						/>
					</label>
					<Button
						onClick={async () => await update()}
						disabled={isUpdating}>
						{isUpdating ? "Updating..." : "Update"}
					</Button>
				</div>

				<div className="flex flex-col w-full gap-2 mt-10">
					<p className="font-bold">Members</p>
					<div className="flex flex-col h-full gap-3">
						{group &&
							members?.map((member) => {
								return (
									<div
										className="flex items-center justify-between"
										key={member.id}>
										<UserRow user={member} />
										{member.id === group.owner.id ? (
											<span className="text-sm font-bold">
												Owner
											</span>
										) : (
											<Button
												disabled={isRemoving}
												onClick={async () =>
													await remove(member.id)
												}>
												{isRemoving
													? "Removing..."
													: "Remove"}
											</Button>
										)}
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
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
			className="flex items-center w-full h-16 gap-3 sm:gap-5">
			<Avatar className="bg-green-700 rounded-full size-12">
				<AvatarImage src={`http://localhost:3001/${user.picture}`} />
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
