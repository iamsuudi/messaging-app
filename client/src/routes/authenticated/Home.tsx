import { useEffect } from "react";
import HomeNav from "./Nav";
import { useUserStore } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { socket } from "@/socket";
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
			// navigate("/home/chats");
		}
		socket.emit("leaveChat");
	}, [user, fetchUser, navigate, queryClient]);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="dalochat-ui-theme">
			<div className="flex flex-col w-screen min-h-screen overflow-x-hidden app dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-background bg-fixed">
				<HomeNav />
				<div className="flex flex-col-reverse w-full h-screen pt-14 sm:pt-16 pb-14 sm:pl-20 sm:pb-2">
					<Outlet />
				</div>
			</div>
		</ThemeProvider>
	);
}
