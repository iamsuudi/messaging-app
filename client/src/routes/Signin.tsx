import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { signin, signup } from "@/services/user.api";
import { formSchema } from "@/types";
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
import { AxiosError } from "axios";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type FormFields = z.infer<typeof formSchema>;

export default function Signin() {
	const navigate = useNavigate();
	const [signType, setSignType] = useState("Signin");
	const { setUser, fetchUser, user } = useUserStore((state) => state);
	const { error, setError, removeError } = userErrorStore((state) => state);

	useEffect(() => {
		const timer = setTimeout(() => {
			removeError();
		}, 3000);

		if (!user) {
			fetchUser()
				.then(() => {
					navigate("/home");
				})
				.catch(() => {
					//
				});
		} else {
			navigate("/home");
		}

		return () => clearTimeout(timer);
	}, [error, user, fetchUser, navigate, removeError]);

	const form = useForm<FormFields>({
		defaultValues: {
			email: "",
		},
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			let response;
			if (signType === "Signin") {
				response = await signin(data);
			} else {
				response = await signup(data);
			}
			setUser(response);
			navigate("/home");
		} catch (error) {
			const e = error as unknown as AxiosError;
			console.log(e?.response?.data.message);
			setError(e?.response?.data.message ?? 'Incorrect credentials');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen px-3">
			{error && (
				<div className="fixed w-full px-5 max-w-96 h-fit top-24">
					<Alert
						variant="destructive"
						className="w-full font-bold bg-gray-50">
						<AlertCircle className="w-4 h-4" />
						<AlertTitle className="font-bold">Error</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				</div>
			)}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full p-10 space-y-8 rounded-lg shadow-xl max-w-96 ">
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="your password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full bg-black/50"
						disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? "Sending..." : signType}
					</Button>

					<Separator orientation="horizontal" />

					<Button
						type="submit"
						className="flex items-center w-full gap-3"
						disabled={form.formState.isSubmitting}>
						<Avatar className="size-6">
							<AvatarImage src="google.png" />
						</Avatar>
						{form.formState.isSubmitting
							? "Wait..."
							: "Signin with google"}
					</Button>

					<button
						type="button"
						className="text-sm underline underline-offset-4"
						onClick={() =>
							setSignType(
								signType === "Signin" ? "Signup" : "Signin"
							)
						}>
						{signType === "Signin" ? "Signup" : "Signin"}
					</button>
				</form>
			</Form>
		</div>
	);
}
