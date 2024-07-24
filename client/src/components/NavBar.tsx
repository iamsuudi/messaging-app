import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function NavBar() {
	const nav = useRef(null);

	useGSAP(
		() => {
			const t1 = gsap.timeline({ defaults: { duration: 1 } });

			t1.from(".logo", {
				x: "-50%",
				opacity: 0,
				scale: 0,
			}).from(".nav", {
				width: 0,
				ease: "elastic.in",
				// duration: 2.5,
			});

			gsap.from(".nav-link", {
				stagger: 0.5,
				opacity: 0,
				x: "-100",
				duration: 0.5,
				delay: 1,
			});
		},
		{ scope: nav }
	);

	return (
		<div
			ref={nav}
			className="fixed top-0 z-10 flex items-center justify-between w-full p-3 backdrop-blur-md sm:backdrop-blur-none">
			<NavLink
				to={"/"}
				className={
					"p-1 sm:text-3xl text-xl font-bold flex items-center logo"
				}
				style={{ fontFamily: "Caveat Brush" }}>
				<Avatar>
					<AvatarImage src="logo.png" />
					<AvatarFallback></AvatarFallback>
				</Avatar>
				Dalo
			</NavLink>
			<div className="hidden sm:flex w-[400px]">
				<ul className="flex px-5 text-sm rounded-full backdrop-blur-md bg-black/5 nav">
					<NavLink
						to={"/"}
						className={({ isActive }) =>
							`${
								isActive && " bg-black text-white"
							} py-2 px-10 rounded-3xl nav-link`
						}>
						Home
					</NavLink>
					<NavLink
						to={"/features"}
						className={({ isActive }) =>
							`${
								isActive && " bg-black text-white"
							} py-2 px-10 rounded-3xl nav-link`
						}>
						Features
					</NavLink>
					<NavLink
						to={"/blog"}
						className={({ isActive }) =>
							`${
								isActive && " bg-black text-white"
							} py-2 px-10 rounded-3xl nav-link`
						}>
						Blog
					</NavLink>
				</ul>
			</div>
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
