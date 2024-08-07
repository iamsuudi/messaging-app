import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from "@/components/ui/menubar";
import {
	Settings,
	LogOut,
	MessageCircleMoreIcon,
	UsersIcon,
	SearchIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store";
import { logout } from "@/services/user.api";
import SearchDrawer from "./SearchDialog";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomeNav() {
	return (
		<div className="fixed top-0 left-0 z-10 flex items-center w-full px-3 py-2 shadow-sm backdrop-blur-lg h-[60px]">
			<NavLink
				to={"/"}
				className={
					"p-1 sm:text-3xl text-xl font-bold flex items-center logo"
				}
				style={{ fontFamily: "Caveat Brush" }}>
				DaloChat
			</NavLink>
			<div className="flex items-end ml-auto mr-5">
				<SearchDrawer>
					<SearchIcon className="size-4" />
				</SearchDrawer>
			</div>
			<ModeToggle />
			<MenuComponent />
		</div>
	);
}

function MenuComponent() {
	const { user, removeUser } = useUserStore(({ user, removeUser }) => ({
		user,
		removeUser,
	}));

	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			removeUser();
			await logout();
			navigate("/auth2");
		} catch (error) {
			//
		}
	};

	return (
		<Menubar className="bg-transparent border-none outline-none">
			<MenubarMenu>
				<MenubarTrigger className="bg-none focus:bg-transparent data-[state=open]:bg-transparent">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</MenubarTrigger>

				<MenubarContent className="flex flex-col gap-2 p-3 border-none dark:bg-white/5 backdrop-blur-lg">
					<MenubarItem
						className="flex items-center gap-2 hover:cursor-pointer"
						onClick={() => navigate("/home/profile")}>
						<Avatar>
							<AvatarImage src={user?.picture} />
							<AvatarFallback>P</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<span className="font-bold">
								{user?.name ?? user?.email}
							</span>
							<span className="text-xs opacity-80">
								@
								{user?.username ??
									`${user?.email?.split("@")[0]}`}
							</span>
						</div>
					</MenubarItem>

					<MenubarSeparator className="opacity-20 dark:bg-white" />

					<MenubarItem className="">
						<button
							onClick={() => navigate("/home")}
							className={"flex items-center gap-2 w-full py-1"}>
							<MessageCircleMoreIcon className="size-4" />
							Chats
						</button>
					</MenubarItem>

					<MenubarItem className="">
						<button
							onClick={() => navigate("/home/groups")}
							className={"flex items-center gap-2 w-full py-1"}>
							<UsersIcon className="size-4" />
							Groups
						</button>
					</MenubarItem>

					<MenubarItem className="">
						<button
							onClick={() => navigate("")}
							className={"flex items-center gap-2 w-full py-1"}>
							<Settings className="size-4" /> Settings
						</button>
					</MenubarItem>

					<MenubarItem className="">
						<button
							onClick={logoutHandler}
							className={"flex items-center gap-2 w-full py-1"}>
							<LogOut className="size-4" /> Log out
						</button>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
