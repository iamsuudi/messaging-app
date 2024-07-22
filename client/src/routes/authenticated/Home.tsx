import { useEffect } from "react";
import HomeNav from "./Nav";
import HomeSideBar from "./SideBar";
import { useUserStore } from "@/store";
import { useNavigate } from "react-router-dom";

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
		<div className="flex flex-col w-screen h-screen">
			<HomeNav />
			<div className="flex flex-col-reverse w-full h-full pt-12 pb-2">
				<HomeSideBar />
				<div className="w-full h-full p-2 border border-blue-500">
					text here
				</div>
			</div>
		</div>
	);
}
