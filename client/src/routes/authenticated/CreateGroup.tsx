import { Button } from "@/components/ui/button";
import Contacts from "./contacts";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createGroup, updateGroupProfilePic } from "@/services/group.api";
import { Textarea } from "@/components/ui/textarea";
import HomeNav from "./Nav";
import { ArrowBigLeft } from "lucide-react";

export default function CreateGroup() {
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [members, setMembers] = useState<string[]>([]);
	const [url, setUrl] = useState(``);
	const [picFormData, setPicFormData] = useState<FormData>();
	const navigate = useNavigate();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => {
			const group = await createGroup(name, bio, members);
			if (picFormData) {
				const response = await updateGroupProfilePic(
					group.id,
					picFormData
				);
				return navigate(`/home/groups/${response.id}`);
			}
			return navigate(`/home/groups/${group.id}`);
		},
		mutationKey: ["createGroup"],
	});

	return (
		<div className="h-full app pt-[60px]">
			<HomeNav />
			<div className="relative flex flex-col mx-auto gap-5 py-5 dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-background bg-fixed rounded w-96">
				<ArrowBigLeft
					className="absolute left-0 rounded-full top-6 hover:cursor-pointer dark:bg-black/5"
					onClick={() => navigate(-1)}
				/>

				<div className="flex flex-col items-center gap-10">
					<div className="w-full text-2xl font-black text-center">
						Create Group
					</div>
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
						<label className="flex flex-col w-full gap-1">
							Group Bio{" "}
							<Textarea
								value={bio}
								onChange={({ target }) => setBio(target.value)}
								className="dark:bg-black/20"
							/>
						</label>
					</div>
				</div>

				<div className="flex flex-col gap-2 border h-80">
					<p>Add members</p>
					<div className="flex flex-col h-full gap-3 overflow-y-scroll app">
						<Contacts setMembers={setMembers} members={members} />
					</div>
				</div>

				<Button
					disabled={!name || isPending}
					onClick={async () => {
						mutateAsync();
					}}>
					{isPending ? "Creating..." : "Submit"}
				</Button>
			</div>
		</div>
	);
}
