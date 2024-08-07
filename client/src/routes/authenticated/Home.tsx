import { useEffect } from "react";
import { useUserStore } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useQueryClient } from "@tanstack/react-query";

export default function HomeIn() {
	const user = useUserStore.getState().user;
	const fetchUser = useUserStore.getState().fetchUser;
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth2");
			});
		} else {
			queryClient.invalidateQueries({ queryKey: ["chats"] });
		}
	}, [user, fetchUser, navigate, queryClient]);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="dalochat-ui-theme">
			<div className="flex flex-col w-screen min-h-screen overflow-x-hidden app dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-background bg-fixed">
				<div className="flex flex-col-reverse w-full h-screen">
					<Outlet />
				</div>
			</div>
		</ThemeProvider>
	);
}
