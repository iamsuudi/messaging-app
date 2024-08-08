import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { startPersonalChatWithSomeone } from "@/services/chat.api";
import { searchUsers } from "@/services/user.api";
import { userErrorStore, useUserStore } from "@/store";
import { UserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AlertCircle, ArrowBigLeft, BanIcon, UserSearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNav from "./Nav";

function UserRow({ user }: { user: UserType }) {
	const me = useUserStore.getState().user;
	const { error, setError, removeError } = userErrorStore((state) => state);

	const navigate = useNavigate();

	const { mutateAsync } = useMutation({
		mutationKey: ["currentChat"],
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

export default function AddContact() {
	const { error, setError, removeError } = userErrorStore((state) => state);
	const [searching, setSearching] = useState(false);
	const { isPending, data, mutateAsync } = useMutation({
		mutationKey: ["search"],
		mutationFn: async (search: string) => {
			const result = await searchUsers(search);
			return result;
		},
	});
    const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			removeError();
		}, 3000);

		return () => clearTimeout(timer);
	}, [error, removeError]);

	return (
		<div className="h-full app pt-[60px] pb-10">
			<HomeNav />
			<div className="relative flex flex-col gap-3 pt-10 dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-background bg-fixed rounded-xl w-96 mx-auto">
				<ArrowBigLeft
					className="absolute left-0 rounded-full top-10 hover:cursor-pointer dark:bg-black/5"
					onClick={() => navigate(-1)}
				/>

				<div>
					<h2 className="mb-10 text-2xl font-black text-center">
						Find contacts
					</h2>
					<Input
						placeholder="Type here minimum 3 characters..."
						autoCorrect="false"
						autoComplete="false"
						autoCapitalize="false"
						spellCheck="false"
						autoFocus
						className="bg-black/5 dark:bg-white/5"
						onChange={async ({ target }) => {
							if (target.value.length > 2 && !isPending) {
								try {
									await mutateAsync(target.value);
								} catch (error) {
									if (axios.isAxiosError(error)) {
										setError(
											error?.response?.data.message ??
												"Check your internet connection."
										);
									}
									setError("Something is wrong");
								}
							}
							if (target.value.length > 2) setSearching(true);
							else setSearching(false);
						}}
					/>
				</div>

				<div className="flex flex-col h-[50dvh] min-h-96 gap-2 overflow-scroll bg-background app dark:bg-transparent">
					{isPending && searching && (
						<>
							<div className="flex items-center space-x-4">
								<Skeleton className="w-12 h-12 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<Skeleton className="w-12 h-12 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<Skeleton className="w-12 h-12 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
						</>
					)}

					{data &&
						data.length > 0 &&
						searching &&
						data.map((user) => {
							return <UserRow key={user.id} user={user} />;
						})}

					{data && data.length === 0 && searching && <NoUserFound />}

					{!searching && (
						<div className="flex flex-col items-center justify-center w-full h-full gap-2 opacity-50">
							<UserSearchIcon
								className=" size-24"
								strokeWidth={0.5}
							/>
							<p className="text-lg font-medium ">
								Search by usernames
							</p>
						</div>
					)}

					{error && (
						<div className="fixed w-full max-w-80 h-fit top-24">
							<Alert
								variant="destructive"
								className="w-full font-bold bg-gray-50">
								<AlertCircle className="w-4 h-4" />
								<AlertTitle className="font-bold">
									Error
								</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function NoUserFound() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-2 opacity-50">
			<BanIcon className="size-24" strokeWidth={0.5} />
			<p className="text-lg font-medium">No User Found</p>
		</div>
	);
}
