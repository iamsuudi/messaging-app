import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { searchUsers } from "@/services/user.api";
import { userErrorStore } from "@/store";
import { UserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AlertCircle, BanIcon, UserSearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SearchPropType {
	children: JSX.Element;
}

interface UserPropType {
	user: UserType;
}

function UserRow({ user }: UserPropType) {
	return (
		<Link
			to={"/chats/56"}
			className="flex items-center h-16 gap-3 sm:gap-5">
			<Avatar className="rounded-full size-12">
				<AvatarImage src="https://github.com/shadcn.png" />
			</Avatar>
			<div className="flex flex-col gap-0">
				<p className="overflow-hidden font-medium text-md whitespace-nowrap text-ellipsis">
					{user.name ?? "No Name"}
				</p>
				<p className="max-w-full overflow-hidden text-xs font-medium text-gray-800 whitespace-nowrap text-ellipsis">
					@{user.username}
				</p>
			</div>
		</Link>
	);
}

export default function SearchDrawer({ children }: SearchPropType) {
	const { error, setError, removeError } = userErrorStore((state) => state);
	const [searching, setSearching] = useState(false);
	const { isPending, data, mutateAsync } = useMutation({
		mutationKey: ["search"],
		mutationFn: async (search: string) => {
			const result = await searchUsers(search);
			return result;
		},
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			removeError();
		}, 3000);

		return () => clearTimeout(timer);
	}, [error, removeError]);

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="flex flex-col gap-3 pt-10 bg-opacity-30 max-w-[90%] backdrop-blur-lg dark:bg-black/5 rounded-xl w-96">
				<DialogHeader>
					<DialogTitle className="mb-5 text-center">
						Search contacts
					</DialogTitle>
					<Input
						placeholder="Type here..."
						autoCorrect="false"
						autoComplete="false"
						autoCapitalize="false"
						spellCheck="false"
						autoFocus
						className="focus-visible:ring-0 dark:bg-transparent"
						onChange={async ({ target }) => {
							if (target.value.length > 3 && !isPending) {
								try {
									await mutateAsync(target.value);
								} catch (error) {
									const e = error as AxiosError;
									console.log(e.message);
									setError(
										e.response?.data.message ??
											"Check your internet connection."
									);
								}
							}
							if (target.value.length > 3) setSearching(true);
							else setSearching(false);
						}}
					/>
				</DialogHeader>
				<div className="flex flex-col gap-2 overflow-scroll h-96 bg-background app dark:bg-transparent">
					{isPending && (
						<div className="flex items-center space-x-4">
							<Skeleton className="w-12 h-12 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
							</div>
						</div>
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
			</DialogContent>
		</Dialog>
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
