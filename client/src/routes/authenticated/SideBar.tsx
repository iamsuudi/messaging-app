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
import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createGroup, updateGroupProfilePic } from "@/services/group.api";
import Contacts from "./contacts";

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
						<Contacts setMembers={setMembers} members={members} />
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
