import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<div className="absolute top-0 z-10 flex items-center justify-between w-full p-3">
			<NavLink
				to={"/"}
				className={"p-1 sm:text-3xl text-xl font-bold flex items-center"}
				style={{ fontFamily: "Caveat Brush" }}>
				<Avatar>
					<AvatarImage src="logo.png" />
					<AvatarFallback>Logo</AvatarFallback>
				</Avatar>
				Dalo
			</NavLink>
			<ul className="hidden px-5 text-sm rounded-full sm:flex backdrop-blur-md bg-black/5">
				<NavLink
					to={"/"}
					className={({ isActive }) =>
						`${
							isActive && " bg-black text-white"
						} py-2 px-10 rounded-3xl`
					}>
					Home
				</NavLink>
				<NavLink
					to={"/features"}
					className={({ isActive }) =>
						`${
							isActive && " bg-black text-white"
						} py-2 px-10 rounded-3xl`
					}>
					Features
				</NavLink>
				<NavLink
					to={"/blog"}
					className={({ isActive }) =>
						`${
							isActive && " bg-black text-white"
						} py-2 px-10 rounded-3xl`
					}>
					Blog
				</NavLink>
			</ul>
			<Menubar className="visible bg-transparent border-none outline-none sm:invisible">
				<MenubarMenu>
					<MenubarTrigger className="">
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
							<NavLink to={"/"}>Home</NavLink>
						</MenubarItem>
						<MenubarItem>
							<NavLink to={"/features"}>Features</NavLink>
						</MenubarItem>
						<MenubarItem>
							<NavLink to={"/blog"}>Blog</NavLink>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
}
