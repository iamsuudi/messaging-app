import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signin } from "@/services/user.api";
import { Crendentials } from "@/types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
	const navigate = useNavigate();

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		try {
			const credentials = Object.fromEntries(
				formData
			) as unknown as Crendentials;
			const user = await signin(credentials);
			console.log({ user });
			return navigate("/home");
		} catch (error) {
			const e = error as AxiosError;
			console.log(e.message);
		}
	};

	return (
		<div className="flex items-center justify-center w-screen h-screen">
			<form
				onSubmit={submitHandler}
				method="post"
				className="p-10 shadow-xl border-t-[1px] border-t-rose-300 max-w-96 flex-col flex gap-5 rounded-lg">
				<h2 className="text-2xl font-bold text-center">Sign In</h2>
				<label className="flex flex-col gap-2">
					Email
					<Input
						placeholder="username@domain.com"
						type="email"
						name="email"
					/>
				</label>
				<label className="flex flex-col gap-2">
					Password
					<Input
						placeholder="sample"
						type="password"
						name="password"
					/>
				</label>
				<Input type="submit" value={"Signin"} />
				<Separator />
				<Button className="flex items-center gap-5 px-2 py-1 rounded-lg">
					<Avatar className="size-8">
						<AvatarImage src="google.png" />
					</Avatar>
					Sign with google
				</Button>
			</form>
		</div>
	);
}
