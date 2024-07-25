import { useEffect } from "react";
import HomeNav from "./Nav";
import { useUserStore } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";

export default function HomeIn() {
	const user = useUserStore.getState().user;
	const fetchUser = useUserStore.getState().fetchUser;
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			fetchUser().catch(() => {
				navigate("/auth/signin");
			});
		}
	}, [user]);

	return (
		<div className="flex flex-col w-screen min-h-screen app">
			<HomeNav />
			<div className="flex flex-col-reverse w-full h-full pb-14 pt-14 sm:pl-20 sm:pb-2 ">
				<Outlet />
			</div>
		</div>
	);
}
