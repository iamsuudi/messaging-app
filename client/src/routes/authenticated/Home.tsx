import { useEffect, useState } from "react";
import HomeNav from "./Nav";
import { useUserStore } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { socket } from "@/socket.io";

export default function HomeIn() {
	const user = useUserStore.getState().user;
	const fetchUser = useUserStore.getState().fetchUser;
	const navigate = useNavigate();
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth2");
			});
		}
	}, [user, fetchUser, navigate]);

	useEffect(() => {
		console.log("connecting...");

		const onConnect = () => setConnected(true);
		const onDisconnect = () => setConnected(false);

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="dalochat-ui-theme">
			<div className="flex flex-col w-screen min-h-screen overflow-x-hidden app dark:bg-gradient-to-tr dark:from-[#0e093f] dark:to-[#5c323f] bg-background bg-fixed">
				<HomeNav />
				<div className="flex flex-col-reverse w-full h-full pt-14 sm:pt-16 pb-14 sm:pl-20 sm:pb-2">
					<Outlet />
				</div>
			</div>
		</ThemeProvider>
	);
}
