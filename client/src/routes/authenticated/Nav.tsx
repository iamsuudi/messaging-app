import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store";
import { logout } from "@/services/user.api";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { LogOut, MessageCircleMoreIcon, Settings, User, UsersIcon } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

export default function HomeNav() {
	const { user, removeUser } = useUserStore(({ user, removeUser }) => ({
		user,
		removeUser,
	}));
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [showSearch, setshowSearch] = useState(false);
	const nav = useRef(null);

	useGSAP(
		() => {
			if (showSearch) {
				gsap.from(".search", {
					scale: 0,
					x: "100",
					duration: 0.5,
					ease: "linear",
				});
				gsap.from(".search-icon", {
					x: "100",
					duration: 0.5,
					ease: "linear",
				});
			}
		},
		{ scope: nav, dependencies: [showSearch] }
	);

	const logoutHandler = async () => {
		try {
			removeUser();
			await logout();
			return navigate("/auth/signin");
		} catch (error) {
			//
		}
	};

	return (
		<div
			ref={nav}
			className="fixed top-0 z-10 flex items-center w-full px-3 py-2 rounded-b-lg backdrop-blur-lg">
			<NavLink
				to={"/"}
				className={
					"p-1 sm:text-3xl text-xl font-bold flex items-center logo"
				}
				style={{ fontFamily: "Caveat Brush" }}>
				DaloChat
			</NavLink>
			<div className="flex items-end ml-auto">
				<button
					type="button"
					className="search-icon"
					onClick={() => setshowSearch(!showSearch)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1}
						stroke="currentColor"
						className="size-4">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</button>

				{showSearch && (
					<input
						placeholder="Search..."
						value={search}
						onChange={({ target }) => setSearch(target.value)}
						className="w-40 pl-1 text-xs outline-none focus:outline-none search"
					/>
				)}
			</div>
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
							<NavLink
								to={""}
								className={"flex items-center gap-2"}>
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
		</div>
	);
}
