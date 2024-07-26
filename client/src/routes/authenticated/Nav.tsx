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
	User,
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

export default function HomeNav() {
	// const [search, setSearch] = useState("");

	return (
		<div className="fixed top-0 z-10 flex items-center w-full px-3 py-2 bg-white shadow-sm">
			<NavLink
				to={"/"}
				className={
					"p-1 sm:text-3xl text-xl font-bold flex items-center logo"
				}
				style={{ fontFamily: "Caveat Brush" }}>
				DaloChat
			</NavLink>
			<div className="flex items-end ml-auto">
				<SearchDrawer>
					<SearchIcon className="size-4" />
				</SearchDrawer>
			</div>
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
			return navigate("/auth2");
		} catch (error) {
			//
		}
	};

	return (
		<Menubar className="bg-transparent border-none outline-none">
			<MenubarMenu>
				<MenubarTrigger className="bg-none focus:bg-none">
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
				<MenubarContent>
					<MenubarItem>
						<Avatar>
							<AvatarImage src="logo.png" />
							<AvatarFallback>P</AvatarFallback>
						</Avatar>
						{user?.email ?? "not found"}
					</MenubarItem>

					<MenubarSeparator />

					<MenubarItem className="my-1">
						<NavLink
							to={"/home/profile"}
							className={"flex items-center gap-2"}>
							<User className="size-4" />
							Profile
						</NavLink>
					</MenubarItem>

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
