import { updateProfile, updateProfilePic } from "@/services/user.api";
import { profileSchema } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { userErrorStore, useUserStore } from "@/store";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import HomeNav from "./Nav";

type FormFields = z.infer<typeof profileSchema>;

export default function Profile() {
	const navigate = useNavigate();
	const { setUser, fetchUser, user } = useUserStore((state) => state);
	const { error, setError, removeError } = userErrorStore((state) => state);
	// const [url, setUrl] = useState(`http://localhost:3001/${user?.picture}`);
	const [url, setUrl] = useState(user?.picture);
	const [picFormData, setPicFormData] = useState<FormData>();

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
	}, [user, fetchUser, navigate, removeError]);

	const form = useForm<FormFields>({
		defaultValues: {
			email: user?.email,
			username: user?.username,
			bio: user?.bio,
			name: user?.name,
		},
		resolver: zodResolver(profileSchema),
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			const response = await updateProfile({
				...data,
				id: user?.id as string,
			});
			setUser(response);
			if (picFormData) {
				const response = await updateProfilePic(picFormData);
				setUser(response);
			}
			navigate("/home");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(
					error?.response?.data.message ??
						"Something is wrong"
				);
			}
			setError("Something is wrong");
		}
	};

	return (
		<div className="h-full app pt-[60px]">
			<HomeNav />
			<div className="flex flex-col items-center justify-center w-screen px-5 py-20 h-fit">
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

				<h1 className="text-2xl font-bold">Update your info</h1>

				<form className="flex flex-col items-center w-full max-w-md gap-3 px-10 py-2">
					<Avatar className="bg-pink-600 size-32">
						<AvatarImage
							src={url}
						/>
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

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full max-w-md p-10 space-y-8 rounded-lg shadow">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="username@domain.com"
											type="email"
											spellCheck="false"
											className="dark:border-none dark:bg-white/5"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="iamsuudi"
											type="text"
											spellCheck="false"
											className="dark:border-none dark:bg-white/5"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Full Name"
											type="text"
											spellCheck="false"
											className="dark:border-none dark:bg-white/5"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your Bio</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Your bio"
											spellCheck="false"
											className="dark:border-none dark:bg-white/5"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
							disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting
								? "Updating..."
								: "Update"}
						</Button>

						{form.formState.errors.root && (
							<FormMessage
								children={form.formState.errors.root.message}
							/>
						)}
					</form>
				</Form>
			</div>
		</div>
	);
}
