import HomeNav from "./Nav";
import HomeSideBar from "./SideBar";

export default function HomeIn() {
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
