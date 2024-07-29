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
import { socket } from "@/socket.io";

export default function HomeNav() {
	return (
		<div className="fixed top-0 z-10 flex items-center w-full px-3 py-2 shadow-sm backdrop-blur-lg">
			<NavLink
				to={"/"}
				className={
					"p-1 sm:text-3xl text-xl font-bold flex items-center logo"
				}
				style={{ fontFamily: "Caveat Brush" }}>
				DaloChat
			</NavLink>
			<div className="flex items-end ml-5 mr-auto">
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
			socket.disconnect();
			return navigate("/auth2");
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

				<MenubarContent className="border-none dark:bg-white/5 backdrop-blur-lg">
					<MenubarItem
						className="flex items-center gap-2"
						onClick={() => navigate("/home/profile")}>
						<Avatar>
							<AvatarImage src="logo.png" />
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

					<MenubarItem className="my-1">
						<NavLink
							to={"/home"}
							className={"flex items-center gap-2"}>
							<MessageCircleMoreIcon className="size-4" />
							Chats
						</NavLink>
					</MenubarItem>

					<MenubarItem className="my-1">
						<NavLink
							to={"/home/groups"}
							className={"flex items-center gap-2"}>
							<UsersIcon className="size-4" />
							Groups
						</NavLink>
					</MenubarItem>

					<MenubarItem className="my-1">
						<NavLink to={""} className={"flex items-center gap-2"}>
							<Settings className="size-4" /> Settings
						</NavLink>
					</MenubarItem>

					<MenubarItem className="my-1">
						<button
							onClick={logoutHandler}
							className={"flex items-center gap-2"}>
							<LogOut className="size-4" /> Log out
						</button>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
