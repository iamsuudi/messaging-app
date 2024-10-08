import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { signin, signup } from "@/services/user.api";
import { signinFormSchema, signupFormSchema } from "@/types";
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

import { userErrorStore, useUserStore } from "@/store";
import axios from "axios";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme-provider";

type SigninFormFields = z.infer<typeof signinFormSchema>;
type SignupFormFields = z.infer<typeof signupFormSchema>;

export default function Signin() {
	const navigate = useNavigate();
	const { setUser, fetchUser, user } = useUserStore((state) => state);
	const { error, setError, removeError } = userErrorStore((state) => state);
	const { setTheme } = useTheme();

	useEffect(() => {
		setTheme("light");
		const timer = setTimeout(() => {
			removeError();
		}, 3000);

		if (!user) {
			fetchUser()
				.then(() => navigate("/home"))
				.catch(() => {});
		} else {
			navigate("/home");
		}

		return () => clearTimeout(timer);
	}, [error, user, fetchUser, navigate, removeError, setTheme]);

	const signinForm = useForm<SigninFormFields>({
		defaultValues: {
			email: "",
		},
		resolver: zodResolver(signinFormSchema),
	});

	const signupForm = useForm<SignupFormFields>({
		defaultValues: {
			email: "",
		},
		resolver: zodResolver(signupFormSchema),
	});

	const signinOnSubmit: SubmitHandler<SigninFormFields> = async (data) => {
		try {
			const response = await signin(data);
			setUser(response);
			navigate("/home");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(
					error.response?.status === 401
						? "Incorrect credentials"
						: "Something is wrong"
				);
			} else {
				setError("Something is wrong");
			}
		}
	};

	const signupOnSubmit: SubmitHandler<SignupFormFields> = async (data) => {
		try {
			const response = await signup(data);
			setUser(response);
			navigate("/home");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(
					error?.response?.data.message ?? "Incorrect credentials"
				);
			}
			setError("Something is wrong");
		}
	};

	const signWithGoogle = () => {
		window.open(`https://dalochat.onrender.com/api/auth/google`, "_self");
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

			<Tabs
				defaultValue="signin"
				className="flex flex-col items-center w-full">
				<TabsList className="flex w-full max-w-96">
					<TabsTrigger value="signin" className="w-full">
						Signin
					</TabsTrigger>
					<TabsTrigger value="signup" className="w-full">
						Signup
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value="signin"
					className="w-full p-10 space-y-8 rounded-lg shadow-xl max-w-96">
					<Form {...signinForm}>
						<form
							onSubmit={signinForm.handleSubmit(signinOnSubmit)}
							className="flex flex-col gap-10">
							<FormField
								control={signinForm.control}
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
								control={signinForm.control}
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
								disabled={signinForm.formState.isSubmitting}>
								{signinForm.formState.isSubmitting
									? "Signing in..."
									: "Signin"}
							</Button>

							<Separator orientation="horizontal" />
						</form>
						<Button
							onClick={signWithGoogle}
							className="flex items-center w-full gap-3"
							disabled={signinForm.formState.isSubmitting}>
							<Avatar className="size-6">
								<AvatarImage src="google.png" />
							</Avatar>
							{"Signin with google"}
						</Button>
					</Form>
				</TabsContent>
				<TabsContent
					value="signup"
					className="w-full p-10 space-y-8 rounded-lg shadow-xl max-w-96">
					<Form {...signupForm}>
						<form
							onSubmit={signupForm.handleSubmit(signupOnSubmit)}
							className="flex flex-col gap-10">
							<FormField
								control={signupForm.control}
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
								control={signupForm.control}
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
							<FormField
								control={signupForm.control}
								name="confirm"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												placeholder="confirm your password"
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
								disabled={signupForm.formState.isSubmitting}>
								{signupForm.formState.isSubmitting
									? "Signing up..."
									: "Signup"}
							</Button>

							<Separator orientation="horizontal" />
						</form>
						<Button
							onClick={signWithGoogle}
							className="flex items-center w-full gap-3"
							disabled={signupForm.formState.isSubmitting}>
							<Avatar className="size-6">
								<AvatarImage src="google.png" />
							</Avatar>
							{"Signup with google"}
						</Button>
					</Form>
				</TabsContent>
			</Tabs>
		</div>
	);
}
