import { updateProfile } from "@/services/user.api";
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
import { useEffect } from "react";

import { useUserStore } from "@/store";
import { Textarea } from "@/components/ui/textarea";

type FormFields = z.infer<typeof profileSchema>;

export default function Profile() {
	const navigate = useNavigate();
	const { setUser, fetchUser, user } = useUserStore((state) => state);

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth/signin");
			});
		} else {
			//
		}
	}, [user]);

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
			console.log(response);
			setUser(response);
			// navigate("/home");
		} catch (error) {
			form.setError("root", {
				message: "Error occurred while trying to signin",
			});
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			form.setError("root", {
				message: undefined,
			});
		}, 3000);

		return () => clearTimeout(timer);
	}, [form]);

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen px-5">
			<h1 className="text-2xl font-bold">Update your info</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full p-10 space-y-8 rounded-lg shadow max-w-96 ">
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
						{form.formState.isSubmitting ? "Updating..." : "Update"}
					</Button>

					{form.formState.errors.root && (
						<FormMessage
							children={form.formState.errors.root.message}
						/>
					)}
				</form>
			</Form>
		</div>
	);
}
