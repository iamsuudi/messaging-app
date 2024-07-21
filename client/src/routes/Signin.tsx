import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { signin } from "@/services/user.api";
import { formSchema } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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

type FormFields = z.infer<typeof formSchema>;

export default function Signin() {
	const navigate = useNavigate();

	const form = useForm<FormFields>({
		defaultValues: {
			email: "",
		},
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			const response = await signin(data);
			console.log(response);
			navigate("/home");
		} catch (error) {
			form.setError("root", {
				message: "Error occurred while trying to signin",
			});
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			form.setError("root", null);
		}, 3000);

		return () => clearTimeout(timer);
	}, [form]);

	return (
		<div className="flex items-center justify-center w-screen h-screen px-5">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full p-10 space-y-8 border-t-2 rounded-lg shadow-xl max-w-96 border-rose-300">
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
						className="w-full bg-blue-400 hover:bg-blue-500"
						disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting
							? "Signing in..."
							: "Signin"}
					</Button>

					<Separator orientation="horizontal" />

					<Button
						type="submit"
						className="w-full"
						disabled={form.formState.isSubmitting}>
						<Avatar>
							<AvatarImage src="google.png" />
						</Avatar>
						{form.formState.isSubmitting
							? "Signing in..."
							: "Signin with google"}
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
