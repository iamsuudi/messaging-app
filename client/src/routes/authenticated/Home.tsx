import { useEffect } from "react";
import HomeNav from "./Nav";
import { useUserStore } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

export default function HomeIn() {
	const user = useUserStore.getState().user;
	const fetchUser = useUserStore.getState().fetchUser;
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth2");
			});
		}
	}, [user]);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="dalochat-ui-theme">
			<div className="flex flex-col w-screen min-h-screen overflow-x-hidden app dark:bg-gradient-to-tr dark:from-[#09203f] dark:to-[#5c323f] bg-background bg-fixed">
				<HomeNav />
				<div className="flex flex-col-reverse w-full h-full pt-14 sm:pt-16 pb-14 sm:pl-20 sm:pb-2">
					<Outlet />
				</div>
			</div>
		</ThemeProvider>
	);
}
