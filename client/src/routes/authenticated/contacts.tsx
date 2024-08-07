import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyContacts } from "@/services/chat.api";
import { UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Contact({ user, onClick, disabled }: ContactPropsType) {
	const [checked, setChecked] = useState(false);

	return (
		<div
			onClick={() => {
				if (!disabled) setChecked(!checked);
				if (!disabled && onClick) onClick(!checked);
			}}
			className={`flex items-center h-16 gap-3 sm:gap-5 ${
				disabled && "opacity-70"
			}`}>
			<Avatar className="bg-blue-700 rounded-full size-12">
				<AvatarImage src={user?.picture} />
			</Avatar>
			<div className="flex flex-col gap-0">
				<p className="overflow-hidden font-medium text-md whitespace-nowrap text-ellipsis">
					{user?.name ?? "No Name"}
				</p>
				<p className="max-w-full overflow-hidden text-xs font-medium text-start opacity-60 whitespace-nowrap text-ellipsis">
					@{user?.username}
				</p>
			</div>

			<Checkbox
				className="ml-auto size-5"
				checked={checked || disabled}
				disabled={disabled}
				onClick={() => {
					setChecked(!checked);
					if (onClick) onClick(!checked);
				}}
			/>
		</div>
	);
}

interface ContactPropsType {
	user: UserType;
	onClick?: (checked: boolean) => void;
	disabled?: boolean;
}

interface ContactsPropsType {
	members?: string[];
	setMembers?: React.Dispatch<React.SetStateAction<string[]>>;
	hidden?: string[];
}

export default function Contacts({
	members,
	setMembers,
	hidden,
}: ContactsPropsType) {
	const { data: contacts, isLoading: contactsLoading } = useQuery({
		queryKey: ["contacts"],
		queryFn: async () => {
			const response = await getMyContacts();
			return response;
		},
	});

	if (contactsLoading)
		return (
			<>
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
			</>
		);

	if (contacts)
		return (
			<>
				{contacts.length > 0 &&
					contacts.map((chat) => {
						return (
							<Contact
								key={chat.id}
								user={chat.contact}
								disabled={hidden?.includes(chat.contact?.id)}
								onClick={(checked: boolean) => {
									if (checked) {
										if (setMembers && members)
											setMembers(
												members.concat(chat.contact?.id)
											);
									} else {
										if (setMembers && members)
											setMembers(
												members.filter(
													(member) =>
														member !==
														chat.contact.id
												)
											);
									}
								}}
							/>
						);
					})}
			</>
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
